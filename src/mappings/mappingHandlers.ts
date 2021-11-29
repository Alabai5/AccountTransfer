import {SubstrateEvent} from "@subql/types";
import {Account, Transfer} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleEvent(event: SubstrateEvent): Promise<void> {
   const toAddress = event.event.data[1];
   const amount = event.event.data[2];
     const toAccount = await Account.get(toAddress.toString());	
     if (!toAccount) {
		await new Account(toAddress.toString()).save();
     }
     const transfer = new Transfer(`${event.block.block.header.number.toNumber()}-${event.idx}`,
);
     transfer.blockNumber = event.block.block.header.number.toBigInt();
     transfer.toId = toAddress.toString();
     transfer.amount = (amount as Balance).toBigInt();
     await transfer.save();


	//const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
   //const record = await StarterEntity.get(event.extrinsic.block.block.header.hash.toString());
   //record.field2 = account.toString();
    //Big integer type Balance of a transfer event
   //record.field3 = (balance as Balance).toBigInt();
   // await record.save();
}


