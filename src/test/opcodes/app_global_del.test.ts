import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalDel } from "../../lib/opcodes/app_global_del";

describe("app_global_del opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppGlobalDel(token, opcodeDefs.app_global_del);

        const context: any = {
            application: {
                globals: {
                    aGlobal: makeBigInt(BigInt(2)),
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(context.application.globals.aGlobal).not.toBeDefined();
    });

    it("throws when application is not found", () => {

        const token: any = {};
        const opcode = new AppGlobalDel(token, opcodeDefs.app_global_del);

        const context: any = {
            // No application.
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when globals is not set", () => {
        
        const token: any = {};
        const opcode = new AppGlobalDel(token, opcodeDefs.app_global_del);

        const context: any = {
            application: {
                // Globals is not set.
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

});