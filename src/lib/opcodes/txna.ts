import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Txna extends Opcode {

    //
    // The index of the transaction to get the field of.
    //
    private fieldArrayIndex!: number;

    //
    // The field to be pulled from the specified transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
        this.fieldArrayIndex = this.parseIntOperand(1);
    }
    
    execute(context: IExecutionContext): void {

        const value = context.txn[this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with transaction ${this.fieldArrayIndex}, please adjust your configuration to include this field.`)
        }

        if (!Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" to be an array when used with opcode ${this.token.opcode}.`);
        }

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field index should >= 0, instead found ${this.fieldArrayIndex}`);
        }

        if (this.fieldArrayIndex >= value.length) {
            throw new Error(`Field index ${this.fieldArrayIndex}, is outside the range of ${value.length}, please adjust your configuration to include this field index.`);
        }

        context.stack.push(value[this.fieldArrayIndex]);
    }
}
