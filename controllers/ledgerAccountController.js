const LedgerAccount = require('../models/LedgerAccount.js');

const createLedgerAccount = async (req, res) => {
    try {
        const { body, tenant } = req;
        body.tenant = tenant;

        console.log('body', body);
        // body.code = body.code.toUpperCase();

        const ledgerAccount = new LedgerAccount(body);
        await ledgerAccount.save();
        res.status(201).json({ status: 'ok', message: 'Ledger Account created successfully', data: ledgerAccount });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating Ledger Account: ${err.message}`, data: null });
    }
};

const getLedgerAccount = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;
        const ledgerAccount = await LedgerAccount.findOne({ _id, tenant })
        res.status(200).json({ status: 'ok', message: 'Ledger Account found successfully', data: ledgerAccount });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding Ledger Account: ${err.message}`, data: null });
    }
}

const getLedgerAccounts = async (req, res) => {
    try {
        const { tenant } = req;
        const ledgerAccounts = await LedgerAccount
            .find({ tenant })

        res.status(200).json({ status: 'ok', message: 'Ledger Accounts found successfully', data: ledgerAccounts });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding Ledger Accounts: ${err.message}`, data: null });
    }
}

const getLedgerAccountsTree = async (req, res) => {
    try {
        const { tenant } = req;
        const ledgerAccounts = await LedgerAccount
            .find({ tenant })
            .lean();

        const ledgerAccountsTree = buildLedgerAccountTree(ledgerAccounts);

        res.status(200).json({ status: 'ok', message: 'Ledger Accounts found successfully', data: ledgerAccountsTree });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding Ledger Accounts: ${err.message}`, data: null });
    }
}

const updateLedgerAccount = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;
        const ledgerAccount = await LedgerAccount
            .findByIdAndUpdate({ _id, tenant }, body, { new: true });
        res.status(200).json({ status: 'ok', message: 'Ledger Account updated successfully', data: ledgerAccount });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating Ledger Account: ${err.message}`, data: null });
    }
}

const deleteLedgerAccount = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;
        await LedgerAccount
            .findByIdAndDelete({ _id, tenant });
        res.status(200).json({ status: 'ok', message: 'Ledger Account deleted successfully', data: null });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting Ledger Account: ${err.message}`, data: null });
    }
}

const buildLedgerAccountTree = (accounts) => {
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
        if (account.parentAccount) {
            const parent = accountMap.get(account.parentAccount.toString());
            if (parent) {
                parent.children.push(accountMap.get(account._id.toString()));
            }
        } else {
            tree.push(accountMap.get(account._id.toString()));
        }
    });

    return tree;
}

module.exports = {
    createLedgerAccount,
    getLedgerAccount,
    getLedgerAccounts,
    getLedgerAccountsTree,
    updateLedgerAccount,
    deleteLedgerAccount
};