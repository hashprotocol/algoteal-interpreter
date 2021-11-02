import { IExecutionContext } from "./context";
import { IExecuteResult } from "./execute-result";
import { IToken } from "./token";

//
// Represents validation and execution for an opcode.
//
export interface IOpcode {

    //
    // Gets the line number of the TEAL code where the opcode was loaded.
    //
    getLineNo(): number;

    //
    // Validates the operands for the opcode.
    //
    validateOperand(): void;

    //
    // Validate the opcode against the current context.
    // This is invoked right before this particular opcode is executed.
    //    
    validateContext(context: IExecuteResult): void;

    //
    // Executes the opcode.
    // Branches can return the offset of an insturction to jump to.
    //
    execute(context: IExecutionContext): number | void;
}

//
// Abstract base class for opcodes.
//
export abstract class Opcode implements IOpcode {

    //
    // The instruction that contains the opcode.
    //
    protected readonly token: IToken;

    //
    // The number of operands expected by the opcode.
    //
    private numOperands: number;

    //
    // The number of stack based arguments expected by this opcode.
    //
    private numStackArgs: number;

    constructor(token: IToken, numOperands: number, numStackArgs: number) {
        this.token = token;
        this.numOperands = numOperands;
        this.numStackArgs = numStackArgs;
    }

    //
    // Gets the line number of the TEAL code where the opcode was loaded.
    //
    getLineNo(): number {
        return this.token.lineNo;
    }

    validateOperand(): void {
        if (this.token.operands.length !== this.numOperands) {
            throw new Error(`Opcode ${this.token.opcode} expects ${this.numOperands} operands, instead found ${this.token.operands.length} operands.`);
        }
    }

    validateContext(context: IExecuteResult): void {
        if (context.stack.length < this.numStackArgs) {
            throw new Error(`Expected ${this.numStackArgs} stack-based arguments on the stack for opcode ${this.token.opcode}, found only ${context.stack.length} values on the stack.`);
        }
    }

    abstract execute(context: IExecutionContext): number | void;

}