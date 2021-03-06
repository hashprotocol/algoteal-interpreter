import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Load } from "../../lib/opcodes/load";

describe("load opcode", () => {

    it ("can load from first position", () => {

        const token: any = {
            operands: [
                "0"
            ],
        };
        const context: any = {
            stack: [],
            scratch: [
                makeBigInt(BigInt(3)),
            ],
        };
        const opcode = new Load(token, opcodeDefs.load);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it ("can load from second position", () => {

        const token: any = {
            operands: [
                "1"
            ],
        };
        const context: any = {
            stack: [],
            scratch: [
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(4)),
            ],
        };
        const opcode = new Load(token, opcodeDefs.load);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(4);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        
        const opcode = new Load(token, opcodeDefs.load);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when operand is less than 0", () => {

        const token: any = {
            operands: [
                "-1"
            ],
        };
        
        const opcode = new Load(token, opcodeDefs.load);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when operand is greater than 254", () => {

        const token: any = {
            operands: [
                "255"
            ],
        };
        
        const opcode = new Load(token, opcodeDefs.load);
        expect(() => opcode.validateOperand()).toThrow();
    });
});