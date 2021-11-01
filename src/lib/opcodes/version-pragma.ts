import { IExecuteResult } from "../..";
import { IToken } from "../../token";
import { Opcode } from "../../opcode";

export class VersionPragma extends Opcode {
   
    //
    // The verision number parsed from operands.
    //
    private versionNo?: number;

    constructor(token: IToken) {
        super(token, 2, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        const operand = this.token.operands[1];

        try {
            this.versionNo = parseInt(operand);
        }
        catch {
            throw new Error(`Failed to parse version number from "#pragma version"`);
        }
    }
    
    execute(context: IExecuteResult): void {
        context.version = this.versionNo!;
    }
}
