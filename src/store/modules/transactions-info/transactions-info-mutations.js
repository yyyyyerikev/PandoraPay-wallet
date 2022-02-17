export default {

    setTransactionInfo(context, {hash, txInfo} ){
        context.txsByHash[ hash ] = txInfo
    },

    deleteTransactionsInfo(state, transactions ){

        const txsByHash = {...state.txsByHash}

        for (const tx of transactions)
            delete txsByHash[tx.hash]

        state.txsByHash = txsByHash
    },

    updateTxInfoNotification(state, {txHash, extraInfo }) {

        const txInfo = {...state.txsByHash[txHash]};

        if (extraInfo.blockchain){

            if (extraInfo.blockchain.inserted){
                txInfo.blkHeight = extraInfo.blockchain.blkHeight
                txInfo.timestamp = extraInfo.blockchain.blkTimestamp
                txInfo.height = extraInfo.blockchain.height
                delete txInfo.mempool
            } else {
                delete txInfo.blkHeight
                delete txInfo.timestamp
                delete txInfo.height
            }

        } else if (extraInfo.mempool) {

            if (extraInfo.mempool.inserted) {
                delete txInfo.blkHeight
                delete txInfo.timestamp
                delete txInfo.height
                txInfo.mempool = true
            }
            else {
                delete txInfo.mempool
                if (!extraInfo.mempool.included) {
                    delete txInfo.blkHeight
                    delete txInfo.timestamp
                    delete txInfo.height
                }
            }

        }

        state.txsByHash[ txHash ] = txInfo;
    },

}