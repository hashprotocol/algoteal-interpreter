import { opcodeDefs } from "../../lib/opcodes";
import { Int } from "../../lib/opcodes/int";

describe("int opcode", () => {

    it ("can push base 10 number", () => {

        const token: any = {
            operands: [
                "12"
            ],
        };
        const context: any = {
            stack: [],
        };
        const opcode = new Int(token, opcodeDefs.int);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

    it ("can push base 16 number", () => {

        const token: any = {
            operands: [
                "0x6c"
            ],
        };
        const context: any = {
            stack: [],
        };
        const opcode = new Int(token, opcodeDefs.int);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(108);
    });

    it ("can handle a bigint", () => {

        const token: any = {
            operands: [
                "0x1234567812345678"
            ],
        };
        const context: any = {
            stack: [],
        };
        const opcode = new Int(token, opcodeDefs.int);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0]?.value === BigInt("0x1234567812345678")).toEqual(true);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Int(token, opcodeDefs.int);

        expect(() => opcode.validateOperand()).toThrow();
    });

    it("can handle a named constant", () => {

        const token: any = {
            operands: [
                "axfer"
            ],
        };
        
        const opcode = new Int(token, opcodeDefs.int);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0].value)).toEqual(4);
    });

});