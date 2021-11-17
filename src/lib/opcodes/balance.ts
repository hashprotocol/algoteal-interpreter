import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress } from "algosdk";

export class Balance extends Opcode {

    execute(context: IExecutionContext): void {
        const accountName = encodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        if (account.balance === undefined) {
            throw new Error(`"balance" not set for account "${accountName}", please add field "balance" to this account in your configuration.`);
        }
        this.pushInt(context, BigInt(account.balance));
    }
}
