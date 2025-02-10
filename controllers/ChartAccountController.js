const ChartAccount = require('../models/ChartAccount.js');
const JournalEntryDetail = require('../models/JournalEntryDetail.js');

const createAccount = async (req, res) => {
    try {
        const { body, tenant } = req;
        body.tenant = tenant;

        const account = new ChartAccount(body);
        await account.save();
        res.status(201).json({ status: 'ok', message: 'Account created successfully', data: account });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating Account: ${err.message}`, data: null });
    }
};

const getAccount = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;
        const account = await ChartAccount.findOne({ _id, tenant })
        res.status(200).json({ status: 'ok', message: 'Account found successfully', data: account });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding Account: ${err.message}`, data: null });
    }
}

const getAccounts = async (req, res) => {
    try {
        const { tenant } = req;
        const ledgerAccounts = await ChartAccount
            .find({ tenant })

        res.status(200).json({ status: 'ok', message: 'Accounts found successfully', data: ledgerAccounts });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding Accounts: ${err.message}`, data: null });
    }
}

const getAccountsTree = async (req, res) => {
    try {
        const { tenant } = req;
        const ledgerAccounts = await ChartAccount
            .find({ tenant })
            .lean();

        const ledgerAccountsTree = buildAccountTree(ledgerAccounts);

        res.status(200).json({ status: 'ok', message: 'Accounts found successfully', data: ledgerAccountsTree });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding Accounts: ${err.message}`, data: null });
    }
}

const updateAccount = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const account = await ChartAccount
            .findByIdAndUpdate({ _id, tenant }, body, { new: true });
        res.status(200).json({ status: 'ok', message: 'Account updated successfully', data: account });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating Account: ${err.message}`, data: null });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        // valida que no tenga asientos contables asociados
        const account = JournalEntryDetail.findOne({ account: _id, tenant });
        if (account) {
            return res.status(400).json({ status: 'error', message: 'Cuenta tiene asientos contables asociados', data: null });
        }

        await ChartAccount
            .findByIdAndDelete({ _id, tenant });
        res.status(200).json({ status: 'ok', message: 'Account deleted successfully', data: null });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting Account: ${err.message}`, data: null });
    }
}

const buildAccountTree = (accounts) => {
    const accountMap = new Map();

    // Convertimos la lista en un mapa para un acceso rápido por _id
    accounts.forEach(account => {
        accountMap.set(account._id.toString(), {
            ...account,
            children: []
        });
    });

    const tree = [];

    accounts.forEach(account => {
        if (account.parent_account) {
            const parent = accountMap.get(account.parent_account.toString());
            if (parent) {
                parent.children.push(accountMap.get(account._id.toString()));
            }
        } else {
            tree.push(accountMap.get(account._id.toString()));
        }
    });

    return tree;
}

const createMultipleAccounts = async (req, res) => {
    try {
        const { body, tenant } = req;

        // validamos que no existan registros en la base de datos de asientos contables
        const journalEntries = await JournalEntryDetail.find({ tenant });
        if (journalEntries.length > 0) {
            return res.status(400).json({ status: 'error', message: 'No se pueden crear cuentas, existen asientos contables asociados', data: null });
        }

        // eliminamos las cuentas existentes
        await ChartAccount.deleteMany({ tenant });

        body.sort((a, b) => a.id - b.id);

        for (const account of body) {
            account.tenant = tenant;

            // crea un nuevo objeto de cuenta sin el _id para que mongo lo genere
            const { id, parent, ...accountWithoutIdandparend } = account;

            const newAccount = new ChartAccount(accountWithoutIdandparend);
            await newAccount.save();

            account._id = newAccount._id;
        }

        // Asignación de cuentas padre
        for (const account of body) {
            if (account.parent) {
                const parent = body.find(a => a.id === account.parent);
                if (parent) {
                    await ChartAccount.findByIdAndUpdate(account._id, { parent_account: parent._id });
                }
            }
        }

        res.status(201).json({ status: 'ok', message: 'Accounts created successfully', data: true });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating Accounts: ${err.message}`, data: false });
    }
}

module.exports = {
    createAccount,
    getAccount,
    getAccounts,
    getAccountsTree,
    updateAccount,
    deleteAccount,
    createMultipleAccounts
};