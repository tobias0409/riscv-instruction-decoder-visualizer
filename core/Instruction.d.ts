export class Instruction {
  isa: string;
  fmt: string;
  len: number;
  asm: string;
  name: string;
  bin: string;
  hex: string;
  asmFrags: Array<any>;
  binFrags: Array<any>;
  binFragsOrdered: Array<any>;
  decodeSteps: Array<DecodeStep>;

  constructor(instruction: string, config?: object);

  private #convertInstruction(instruction: string): void;
  private #decodeAsm(): void;
  private #encodeBin(instruction: string): void;
}

export function convertBase(val: string, baseSrc: number, baseDst: number, Pad: number): string;
export function convertRegToAbi(reg: string): string;

export class Frag {
  id: number;
  asm: string;
  bits: string;
  field: string;
  mem: boolean;

  constructor(id: number, asm: string, bits: string, field: string, mem?: boolean);
}

export interface DecodeStep {
  title: string;
  sections: Array<string>;
}