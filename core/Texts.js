const highlightBits = (binFrags, binFragsOrdered, currentStep) => {
  const highlightedFrag = binFragsOrdered[currentStep];
  return binFrags
    .map((frag, index) => {
      if (frag.field === highlightedFrag.field) {
        return `<span class="text-indigo-600 font-bold" key="${index}">${frag.bits}</span>`;
      } else {
        return `<span key="${index}">${frag.bits}</span>`;
      }
    })
    .join("");
};

const highlightBitsWithLabels = (binFrags, binFragsOrdered, steps) => {
  const highlightedFrags = steps.map((step) => binFragsOrdered[step]);
  let fragStart = 31;
  return `
    <div style="display: flex; justify-content: center; flex-wrap: wrap;">
      ${binFrags
        .map((frag, index) => {
          const highlighted = highlightedFrags.some(
            (highlightedFrag) => frag.field === highlightedFrag.field
          )
            ? "text-indigo-600 font-bold"
            : "";
          const start = fragStart - frag.bits.length + 1;
          const end = fragStart;
          fragStart -= frag.bits.length;
          return `
          <div style="display: inline-block; position: relative; margin-right: 3.5ch; margin-top: 2ch; left: 20px;" class="text-center">
            <div style="position: absolute; top: -20px; left: -15px; font-size: 14px">${end}</div>
            <span class="${highlighted}" key="${index}">${frag.bits}</span>
            <div style="position: absolute; top: -20px; right: -15px; font-size: 14px">${start}</div>
            <div style="font-size: 16px" class="text-center">${frag.field}</div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;
};

/**
 *
 *  R-Type OP-Instructions
 */
export const textOP = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  rs1,
  rs2
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, 0)}`,
      `The opcode indicates this is an <b>${type}</b> instruction of the instruction set <b>${isa}</b>.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field further refines the type of operation within the ${type} structure.`,
    ],
  },
  {
    title: "Step 3 - Identify Funct7",
    sections: [
      `Extract the funct7 field from bits <b>31-25</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The funct7 field helps distinguish between similar operations within the ${type} structure.`,
    ],
  },
  {
    title: "Step 4 - Get Instruction",
    sections: [
      `Combine opcode, funct3, and funct7 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1, 2])}`,
      `With the operation determined, we can now decode the registers involved.`,
    ],
  },
  {
    title: "Step 5 - Identify rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register where the result will be stored.`,
      `In this case, the result will be stored in register ${rd}.`,
    ],
  },
  {
    title: "Step 6 - Identify rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The rs1 field specifies the first source register.`,
      `Register ${rs1} provides the first operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 7 - Identify rs2",
    sections: [
      `Extract the rs2 field from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The rs2 field specifies the second source register.`,
      `Register ${rs2} provides the second operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 8 - Summarize",
    sections: [
      `The decoded instruction is: <b>${instruction} ${rd}, ${rs1}, ${rs2}</b>.`,
      `This means: Perform the ${instruction} operation with operands in registers ${rs1} and ${rs2}, and store the result in ${rd}.`,
    ],
  },
];

/**
 *
 *  R-Type  (F & D Extension) Instructions
 */
export const textOP_FP = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  rs1,
  rs2,
  fmt
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, 0)}`,
      `The opcode indicates this is an <b>${type}</b> instruction of the instruction set <b>${isa}</b>.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field further refines the type of operation within the ${type} structure.`,
    ],
  },
  {
    title: "Step 3 - Identify Funct7",
    sections: [
      `Extract the funct7 field from bits <b>31-25</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The funct7 field helps distinguish between similar operations within the ${type} structure.`,
    ],
  },
  {
    title: "Step 4 - Get Instruction",
    sections: [
      `Combine opcode, funct3, and funct7 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1, 2])}`,
      `With the operation determined, we can now decode the registers involved.`,
    ],
  },
  {
    title: "Step 5 - Identify rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination floating-point register where the result will be stored.`,
      `In this case, the result will be stored in register ${rd}.`,
    ],
  },
  {
    title: "Step 6 - Identify rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The rs1 field specifies the first source floating-point register.`,
      `Register ${rs1} provides the first operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 7 - Identify rs2",
    sections: [
      `Extract the rs2 field from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The rs2 field specifies the second source floating-point register.`,
      `Register ${rs2} provides the second operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 8 - Identify Format",
    sections: [
      `Extract the fmt field, which specifies the format of the floating-point operation: <b>${fmt}</b>.`,
      `The fmt field determines whether this is a single-precision = (00), double-precision = (01), or another type of floating-point operation.`,
    ],
  },
  {
    title: "Step 9 - Summarize",
    sections: [
      `The decoded instruction is: <b>${instruction} ${rd}, ${rs1}, ${rs2}</b>.`,
      `This means: Perform the ${instruction} operation on operands in floating-point registers ${rs1} and ${rs2}, and store the result in ${rd}.`,
    ],
  },
];

/**
 *
 *  R-Type A(MO) Instructions
 */
export const textAMO = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  rs1,
  rs2
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, 0)}`,
      `The opcode indicates this is an <b>${type}</b> instruction of the instruction set <b>${isa}</b>.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field indicates a specific variant of ${type} operation.`,
    ],
  },
  {
    title: "Step 3 - Identify Funct5",
    sections: [
      `Extract the funct5 field from bits <b>31-27</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The funct5 field determines the specific atomic memory operation within the ${type} category.`,
    ],
  },
  {
    title: "Step 4 - Get Instruction",
    sections: [
      `Combine opcode, funct3, and funct5 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1, 2])}`,
    ],
  },
  {
    title: "Step 5 - Identify rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register where the result will be stored.`,
      `In this case, the result will be stored in register ${rd}.`,
    ],
  },
  {
    title: "Step 6 - Identify rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The rs1 field specifies the memory address register for the atomic operation.`,
      `Register ${rs1} holds the memory address for the operation.`,
    ],
  },
  {
    title: "Step 7 - Identify rs2",
    sections: [
      `Extract the rs2 field from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The rs2 field specifies the source register containing the value to be used in the atomic operation.`,
      `Register ${rs2} provides the operand for the operation.`,
    ],
  },
  {
    title: "Step 8 - Summarize",
    sections: [
      `The decoded instruction is: <b>${instruction} ${rd}, ${rs1}, ${rs2}</b>.`,
      `This means: Perform the atomic operation ${instruction} at the memory address in ${rs1} using the value in ${rs2}, and store the result in ${rd}.`,
    ],
  },
];

/**
 *
 *  I-Type JALR Instruction
 */
export const textJALR = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  rs1,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, 0)}`,
      `The opcode indicates this is a <b>${type}</b> instruction of the instruction set <b>${isa}</b>.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
    ],
  },
  {
    title: "Step 3 - Get Instruction",
    sections: [
      `Combine opcode and funct3 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1])}`,
    ],
  },
  {
    title: "Step 4 - Identify rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rd field specifies the destination register where the return address will be stored.`,
      `In this case, the return address will be stored in register ${rd}.`,
    ],
  },
  {
    title: "Step 5 - Identify rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rs1 field specifies the base register containing the jump target address.`,
      `Register ${rs1} provides the base address for the jump.`,
    ],
  },
  {
    title: "Step 6 - Identify Immediate",
    sections: [
      `Extract the immediate (imm) field from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The imm field provides the offset added to the address in ${rs1} to compute the jump target.`,
      `The computed offset is: <b>${imm}</b>.`,
    ],
  },
  {
    title: "Step 7 - Summarize",
    sections: [
      `The decoded instruction is: <b>${instruction} ${rd}, ${imm}(${rs1})</b>.`,
      `This means: Compute the jump target as the sum of the address in ${rs1} and ${imm}. Save the return address in ${rd}, and jump to the computed address.`,
    ],
  },
];

/**
 *
 *  I-Type LOAD AND LOAD_FP Instructions
 */
export const textLOAD = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  rs1,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, 0)}`,
      `The opcode indicates this is an <b>${type}</b> instruction.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field specifies the specific load operation.`,
    ],
  },
  {
    title: "Step 3 - Get Instruction",
    sections: [
      `Combine opcode and funct3 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1])}`,
      `With the operation determined, we can now decode the registers involved and the immediate value.`,
    ],
  },
  {
    title: "Step 4 - Identify Destination Register (rd)",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rd field specifies the destination register where the loaded value will be stored.`,
      `The loaded value will be stored in register <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 5 - Identify Source Register (rs1)",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rs1 field specifies the base address register for the load operation.`,
      `Register <b>${rs1}</b> provides the base address from which data will be loaded.`,
    ],
  },
  {
    title: "Step 6 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value (imm) from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The immediate value is a 12-bit signed offset added to the value in <b>${rs1}</b> to calculate the memory address.`,
      `The calculated immediate offset is <b>${imm}</b>.`,
    ],
  },
  {
    title: "Step 7 - Calculate Memory Address",
    sections: [
      `Combine the base address from <b>${rs1}</b> and the immediate value <b>${imm}</b>:`,
      `Memory address = <b>${rs1} + ${imm}</b>.`,
      `The load operation will fetch data from this calculated memory address.`,
    ],
  },
  {
    title: "Step 8 - Summarize",
    sections: [
      `The decoded load instruction is: <b>${instruction} ${rd}, ${imm}(${rs1})</b>.`,
      `This means: Load the value from the memory address calculated as <b>${rs1} + ${imm}</b>, and store it in <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  I-Type OP-IMM Instructions
 */
export const textOP_IMM = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  opcode,
  rd,
  rs1,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is an <b>${type}</b> instruction.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field determines the specific operation performed.`,
    ],
  },
  {
    title: "Step 3 - Get Instruction",
    sections: [
      `Combine opcode and funct3 to identify the instruction: <span class="font-bold">${opcode}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1])}`,
      `With the operation determined, we can now decode the registers involved and the immediate value.`,
    ],
  },
  {
    title: "Step 4 - Identify Destination Register rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register where the result will be written: <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 5 - Identify Source Register rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rs1 field specifies the source register for the operation: <b>${rs1}</b>.`,
    ],
  },
  {
    title: "Step 6 - Decode Immediate (imm)",
    sections: [
      `Extract the immediate value (imm) from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The immediate value specifies a constant to be used in the operation.`,
      `The decoded immediate value is <b>${imm}</b>.`,
    ],
  },
  {
    title: "Step 7 - Summarize",
    sections: [
      `The decoded instruction is: <b>${opcode} ${rd}, ${rs1}, ${imm}</b>.`,
      `This means: Perform the ${opcode} operation on the value in <b>${rs1}</b> and the immediate <b>${imm}</b>, and write the result to <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  I-Type Shift Instructions
 */
export const textOP_IMM_Shift = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  opcode,
  rd,
  rs1,
  shamt,
  shtyp
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is a <b>${type}</b> shift instruction.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field determines it is a shift operation:`,
      `- <b>001</b>: Logical left shift (SLLI).`,
      `- <b>101</b>: Right shift (logical or arithmetic, determined by bit <b>30</b>).`,
      `For this instruction, funct3 specifies a <b>${opcode}</b> operation.`,
    ],
  },
  {
    title: "Step 3 - Determine ISA and Validate Shift Amount (shamt)",
    sections: [
      `Examine the most significant bits (MSBs) of the shift amount (shamt) to determine the valid ISA:`,
      `- RV32I allows 5-bit shift amounts (0-31).`,
      `- RV64I allows 6-bit shift amounts (0-63).`,
      `- RV128I allows 7-bit shift amounts (0-127).`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4, 5])}`,
      `The shift amount is validated to ensure it adheres to the ISA constraints.`,
      `For this instruction, the detected ISA is <b>${isa}</b>.`,
    ],
  },
  {
    title: "Step 4 - Identify Shift Type (shtyp for Right Shifts Only)",
    sections: [
      `If this is a right shift (funct3 = <b>101</b>), extract the shift type (shtyp) from bit <b>30</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The shtyp bit determines the type of right shift:`,
      `- <b>0</b>: Logical right shift (<b>SRLI</b>).`,
      `- <b>1</b>: Arithmetic right shift (<b>SRAI</b>).`,
      `For logical left shifts (funct3 = <b>001</b>), this bit is irrelevant and not used.`,
      `For this instruction, shtyp is <b>${shtyp}</b>.`,
    ],
  },
  {
    title: "Step 5 - Identify Source Register rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rs1 field specifies the source register for the operation: <b>${rs1}</b>.`,
    ],
  },
  {
    title: "Step 6 - Identify Destination Register rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register where the result will be written: <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 7 - Decode Shift Amount (shamt)",
    sections: [
      `Extract the shift amount (shamt) from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The shift amount specifies how many positions the bits in <b>${rs1}</b> should be shifted.`,
      `The decoded shift amount is <b>${shamt}</b>.`,
    ],
  },
  {
    title: "Step 9 - Summarize",
    sections: [
      `The decoded instruction is: <b>${opcode} ${rd}, ${rs1}, ${shamt}</b>.`,
      `This means: Perform the ${opcode} operation on the value in <b>${rs1}</b>, shift by <b>${shamt}</b>, and write the result to <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  I-Type MISC_MEM LOAD instructions
 */
export const textMISC_MEM_LOAD = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  inst,
  rs1,
  rd,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates that this instruction is an <b>${type}</b> instruction.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`,
    ],
  },
  {
    title: "Step 2 - Identify Source Register (rs1)",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rs1 field specifies the base address register for the load extension operation.`,
      `The value from register <b>${rs1}</b> is used to calculate the memory address.`,
    ],
  },
  {
    title: "Step 3 - Identify Destination Register (rd)",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register where the loaded value will be stored.`,
      `The loaded value will be stored in register <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 4 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The immediate value (<b>${imm}</b>) will be added to the base address stored in register <b>${rs1}</b> to form the effective memory address.`,
    ],
  },
  {
    title: "Step 5 - Summarize",
    sections: [
      `The decoded load extension instruction is: <b>${inst} ${rd}, ${imm}(${rs1})</b>.`,
      `This means: Load the value from memory, calculated by adding the immediate value <b>${imm}</b> to the value in register <b>${rs1}</b>, and store it in register <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  I-Type MISC_MEM FENCE Instructions
 */
export const textMISC_MEM_FENCE = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  inst,
  fm,
  pred,
  succ,
  rs1,
  rd
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates that this is a <b>${inst}</b> instruction and an <b>${type}</b> instruction.`,
    ],
  },
  {
    title: "Step 2 - Identify FM (Fence Mode)",
    sections: [
      `Extract the fm field from bits <b>19-16</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The fm field specifies the type of fence operation.`,
      `For this instruction, the fm value is <b>${fm}</b>, which defines the fence operation type.`,
    ],
  },
  {
    title: "Step 3 - Identify Predecessor and Successor Registers",
    sections: [
      `Extract the pred field from bits <b>31-24</b> and the succ field from bits <b>23-16</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2, 3])}`,
      `The pred field specifies the predecessor memory order, and the succ field specifies the successor memory order.`,
      `For this example, the predecessor is <b>${pred}</b>, and the successor is <b>${succ}</b>.`,
    ],
  },
  {
    title: "Step 4 - Identify rd",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The rd field specifies the destination register where the result will be stored.`,
      `In this case, the result will be stored in register ${rd}.`,
    ],
  },
  {
    title: "Step 5 - Identify rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The rs1 field specifies the first source register.`,
      `Register ${rs1} provides the first operand for the ${inst} operation.`,
    ],
  },
  {
    title: "Step 6 - Summarize",
    sections: [
      `The decoded fence instruction is: <b>${inst} ${rd}, ${pred}, ${succ}</b>.`,
      `This means: Perform a fence operation with the specified predecessor and successor memory orderings. If necessary, write the result to register <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  I-Type MISC_MEM FENCE.I Instructions
 */
export const textMISC_MEM_FENCE_I = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  inst,
  imm,
  rd,
  rs1
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates that this is a <b>${inst}</b> instruction and also this is an <b>${type}</b> instruction.`,
    ],
  },
  {
    title: "Step 2 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The immediate value (<b>${imm}</b>) is a parameter for the fence.i operation, often used for cache invalidation or similar operations.`,
    ],
  },
  {
    title: "Step 3 - Identify Source Register (rs1)",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rs1 field specifies the source register used in the fence.i operation.`,
      `For this example, the source register is <b>${rs1}</b>.`,
    ],
  },
  {
    title: "Step 4 - Identify Destination Register (rd)",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register for the result of the fence.i operation.`,
      `For this example, the destination register is <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 5 - Summarize",
    sections: [
      `The decoded fence.i instruction is: <b>${inst} ${rd}, ${imm}</b>.`,
      `This means: Perform a fence.i operation, possibly involving cache invalidation, with an immediate value of <b>${imm}</b>, and store the result in register <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  I-Type SYSTEM Trap instructions
 */
export const textSYSTEM_TRAP = (binFrags, binFragsOrdered, type, isa, inst) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode alone does not determine the instruction type. We need to consider funct3 and funct12 fields as well.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field helps narrow down the instruction type.`,
    ],
  },
  {
    title: "Step 3 - Identify Funct12",
    sections: [
      `Extract the funct12 field from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The funct12 field further specifies the exact type of the instruction as ${type}.`,
    ],
  },
  {
    title: "Step 4 - Get Instruction",
    sections: [
      `Combine opcode, funct3, and funct12 to identify the instruction: <span class="font-bold">${inst}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1, 2])}`,
      `With the operation determined, we can now validate the registers involved.`,
    ],
  },
  {
    title: "Step 5 - Validate Registers",
    sections: [
      `Ensure that both <b>rd</b> (bits <b>11-7</b>) and <b>rs1</b> (bits <b>19-15</b>) are set to <b>00000</b>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3, 4])}`,
      `These registers are unused for trap instructions and must be zero.`,
    ],
  },
  {
    title: "Step 6 - Summarize",
    sections: [
      `The decoded trap instruction is: <b>${inst}</b>.`,
      `For example: <b>ecall</b> invokes an environment call for system services, while <b>ebreak</b> triggers a breakpoint for debugging.`,
    ],
  },
];

/**
 *
 *  I-Type SYSTEM Zicsr instructions
 */
export const textSYSTEM_ZICSR = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  inst,
  rd,
  rs1,
  csr
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates that this is a <b>${type}</b> instruction.`,
    ],
  },
  {
    title: "Step 2 - Identify CSR (Control/Status Register)",
    sections: [
      `Extract the csr field from bits <b>31-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The csr field specifies the control or status register being accessed. For this instruction, the CSR is <b>${csr}</b>.`,
    ],
  },
  {
    title: "Step 3 - Identify Destination Register",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rd field specifies the destination register where the result will be written.`,
      `For this instruction, the destination register is <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 4 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The funct3 field determines whether rs1 is treated as a source register or an immediate value.`,
      `For this instruction, the funct3 value is <b>${binFragsOrdered[3].bits}</b>.`,
    ],
  },
  {
    title: "Step 5 - Identify Source Register or Immediate",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The rs1 field can either specify a source register or an immediate value, depending on the <b>funct3</b> field.`,
      `For example, rs1 can be treated as an immediate if funct3 specifies immediate mode.`,
    ],
  },
  {
    title: "Step 6 - Summarize",
    sections: [
      `The decoded Zicsr instruction is: <b>${inst} ${rd}, ${rs1}, ${csr}</b>.`,
      `For example: <b>csrrw</b> reads a value from CSR <b>${csr}</b>, modifies it with the value in register <b>${rs1}</b>, and writes the result to register <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  S-Type STORE & STORE_FP instructions
 */
export const textSTORE = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rs1,
  rs2,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is a <b>${type}</b> instruction.`,
      `The opcode determines the structure for decoding the remaining fields and confirms this is part of the <b>${isa}</b> ISA.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field specifies the specific store operation:`,
    ],
  },
  {
    title: "Step 3 - Get Instruction",
    sections: [
      `Combine opcode and funct3 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1])}`,
    ],
  },
  {
    title: "Step 4 - Identify Base Address Register (rs1)",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rs1 field specifies the base address register for the store operation.`,
      `Register <b>${rs1}</b> provides the base address for the memory location where the value will be stored.`,
    ],
  },
  {
    title: "Step 5 - Identify Source Register (rs2)",
    sections: [
      `Extract the rs2 field from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rs2 field specifies the value to be stored in memory.`,
      `Register <b>${rs2}</b> holds the value that will be stored.`,
    ],
  },
  {
    title: "Step 6 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value (imm) from bits <b>31-25</b> and <b>11-6</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4, 5])}`,
      `The immediate value is a signed offset added to the base address from <b>${rs1}</b> to calculate the memory address.`,
      `The immediate value is <b>${imm}</b>.`,
    ],
  },
  {
    title: "Step 7 - Calculate Memory Address",
    sections: [
      `Combine the base address from <b>${rs1}</b> and the immediate value <b>${imm}</b>:`,
      `Memory address = <b>${rs1} + ${imm}</b>`,
      `The store operation will write data to this calculated memory address.`,
    ],
  },
  {
    title: "Step 8 - Summarize",
    sections: [
      `The decoded store instruction is: <b>${instruction} ${rs2}, ${imm}(${rs1})</b>.`,
      `This means: Store the value from <b>${rs2}</b> into the memory address <b>${rs1} + ${imm}</b>.`,
    ],
  },
];

/**
 *
 *  B-Type BRANCH instructions
 */
export const textBRANCH = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rs1,
  rs2,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is a <b>${type}</b> (Branch) instruction.`,
    ],
  },
  {
    title: "Step 2 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The funct3 field specifies the specific branch condition:`,
    ],
  },
  {
    title: "Step 3 - Get Instruction",
    sections: [
      `Combine opcode and funct3 to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1])}`,
    ],
  },
  {
    title: "Step 4 - Identify Source Registers rs2",
    sections: [
      `Extract the rs2 field from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [7])}`,
      `The rs1 and rs2 fields specify the registers to be compared in the branch condition.`,
      `The comparison is between registers <b>${rs1}</b> and rs2.`,
    ],
  },
  {
    title: "Step 5 - Identify Source Registers rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [6])}`,
      `The rs1 and rs2 fields specify the registers to be compared in the branch condition.`,
      `The comparison is between registers <b>${rs1}</b> and <b>${rs2}</b>.`,
    ],
  },
  {
    title: "Step 6 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value (imm) from bits <b>31-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2, 3, 4, 5])}`,
      `The immediate value is split into individual parts which must be sorted as shown above.`,
      `This leads to the following immediate value: <b>${binFragsOrdered[2].bits}</b> <b>${binFragsOrdered[3].bits}</b> <b>${binFragsOrdered[4].bits}</b> <b>${binFragsOrdered[5].bits}</b> <b>0</b>.`,
      `Note that the last index (0) is missing because this index gets filled with a zero.`,
      `The immediate value is a signed offset that will be added to the Program Counter (PC) if the branch condition is met.`,
      `The immediate value is <b>${imm}</b>.`,
    ],
  },
  {
    title: "Step 7 - Summarize",
    sections: [
      `The decoded branch instruction is: <b>${instruction} ${rs1}, ${rs2}, ${imm}</b>.`,
      `This means: If the condition based on <b>${rs1}</b> and <b>${rs2}</b> is met, branch to address <b>PC + ${imm}</b>.`,
    ],
  },
];

/**
 *
 *  U-Type instructions (LUI, AUIPC)
 */
export const textUType = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  imm_31_12
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is a <b>${type}</b> instruction.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`,
    ],
  },
  {
    title: "Step 2 - Identify Destination Register (rd)",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The rd field specifies the destination register where the result of the operation will be stored.`,
      `The result will be stored in register <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 3 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value (imm) from bits <b>31-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The immediate value is a 20-bit unsigned value that is used in the operation.`,
      `For this example, the immediate value is <b>${imm_31_12}</b>.`,
    ],
  },
  {
    title: "Step 4 - Summarize",
    sections: [
      `The decoded instruction is: <b>${instruction} ${rd}, ${imm_31_12}</b>.`,
      `This means: Perform the operation <b>${instruction}</b> using the immediate value <b>${imm_31_12}</b>, and store the result in <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  J-Type JAL instruction
 */
export const textJAL = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  imm
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is a <b>${type}</b> instruction.`,
      `Knowing the instruction type helps determine the structure for decoding the rest of the fields.`,
    ],
  },
  {
    title: "Step 2 - Identify Destination Register (rd)",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The rd field specifies the register where the return address (the address of the next instruction) will be stored.`,
      `The return address will be stored in register <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 3 - Identify Immediate Value (imm)",
    sections: [
      `Extract the immediate value (imm) from bits <b>31-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1, 2, 3, 4])}`,
      `The immediate value is split into individual parts which must be sorted as shown above, where the number in the bracket specifies the final bit position.`,
      `This leads to the following immediate value: <b>${binFragsOrdered[1].bits}</b> <b>${binFragsOrdered[2].bits}</b> <b>${binFragsOrdered[3].bits}</b> <b>${binFragsOrdered[4].bits}</b> <b>0</b>.`,
      `Note: The last index <i>imm[0]</i> is missing because this index gets filled with a zero.`,
      `The immediate value is a signed offset that will be added to the Program Counter (PC) to calculate the jump address.`,
      `The immediate value is <b>${imm}</b>.`,
    ],
  },
  {
    title: "Step 4 - Summarize",
    sections: [
      `The decoded instruction is: <b>${instruction} ${rd}, ${imm}</b>.`,
      `This means: Jump to address <b>PC + ${imm}</b>, and store the return address in register <b>${rd}</b>.`,
    ],
  },
];

/**
 *
 *  R4-Type (MADD, MSUB, NMADD, NMSUB) instructions
 */
export const textR4 = (
  binFrags,
  binFragsOrdered,
  type,
  isa,
  instruction,
  rd,
  rs1,
  rs2,
  rs3
) => [
  {
    title: "Step 1 - Identify Opcode",
    sections: [
      `Extract the opcode from bits <b>6-0</b> of the instruction:`,
      `${highlightBits(binFrags, binFragsOrdered, [0])}`,
      `The opcode indicates this is a <b>${type}</b> instruction.`,
    ],
  },
  {
    title: "Step 2 - Identify Format (fmt)",
    sections: [
      `Extract the fmt field from bits <b>26-25</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [1])}`,
      `The fmt field specifies the format of the operation.`,
    ],
  },
  {
    title: "Step 3 - Get Instruction",
    sections: [
      `Combine opcode and fmt to identify the instruction: <span class="font-bold">${instruction}</span>.`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [0, 1])}`,
    ],
  },
  {
    title: "Step 4 - Identify Funct3",
    sections: [
      `Extract the funct3 field from bits <b>14-12</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [2])}`,
      `The funct3 field specifies the rounding mode:`,
      `0=to nearest, 1=toward zero, 2=down, 3=up, 4=to nearest (max magnitude), 7=dynamic`,
    ],
  },
  {
    title: "Step 5 - Identify Source Register rs1",
    sections: [
      `Extract the rs1 field from bits <b>19-15</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [4])}`,
      `The rs1 field specifies the first source register used in the operation.`,
      `Register <b>${rs1}</b> provides the first operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 6 - Identify Source Register rs2",
    sections: [
      `Extract the rs2 field from bits <b>24-20</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [5])}`,
      `The rs2 field specifies the second source register used in the operation.`,
      `Register <b>${rs2}</b> provides the second operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 7 - Identify Source Register rs3",
    sections: [
      `Extract the rs3 field from bits <b>31-27</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [6])}`,
      `The rs3 field specifies the third source register used in the operation.`,
      `Register <b>${rs3}</b> provides the third operand for the ${instruction} operation.`,
    ],
  },
  {
    title: "Step 8 - Identify Destination Register (rd)",
    sections: [
      `Extract the rd field from bits <b>11-7</b>:`,
      `${highlightBitsWithLabels(binFrags, binFragsOrdered, [3])}`,
      `The rd field specifies the destination register where the result of the operation will be stored.`,
      `The result will be stored in register <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 9 - Explain Execution",
    sections: [
      `Perform the R4 operation as specified by the ${instruction} instruction using registers <b>${rs1}</b>, <b>${rs2}</b>, and <b>${rs3}</b>.`,
      `The R4 type instructions involve a multiply operation followed by an addition or subtraction.`,
      `Store the result of the operation in register <b>${rd}</b>.`,
    ],
  },
  {
    title: "Step 10 - Summarize",
    sections: [
      `The decoded R4 instruction is: <b>${instruction} ${rd}, ${rs1}, ${rs2}, ${rs3}</b>.`,
      `This means: Perform the operation using registers <b>${rs1}</b>, <b>${rs2}</b>, and <b>${rs3}</b>, and store the result in <b>${rd}</b>.`,
    ],
  },
];