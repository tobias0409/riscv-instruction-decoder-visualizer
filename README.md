# RISC-V Instruction Decoder Visualizer

## Introduction
The **RISC-V Instruction Decoder Visualizer** is a tool designed to help you decode RISC-V instructions in either binary or hexadecimal format. It provides a detailed, step-by-step breakdown of the decoding process, mirroring how the instruction would be decoded manually. This makes it an excellent resource for students, educators, and professionals working with RISC-V architecture.

This tool was developed as part of the Seminar on Computational Engineering at **Johannes Kepler University (JKU)** during the Winter Semester 2024/2025.

---

## Features and Support
The RISC-V Instruction Decoder Visualizer currently supports the following instruction sets and extensions:

### Base Instruction Sets
- **RV32I**
- **RV64I**
- **RV128I**

### Extensions
- General Category Extensions (GC):
  - **Zifencei** (Instruction-Fetch Fence)
  - **Zicsr** (Control and Status Register Access)
- Arithmetic Extensions:
  - **M** (Multiplication/Division)
  - **A** (Atomic Operations)
- Floating-Point Extensions:
  - **F** (Single-Precision)
  - **D** (Double-Precision)
  - **Q** (Quad-Precision)

### Planned Features
Support for the **C (Compressed)** instruction set is currently under development and will be added in a future update.

### Privileged Instructions
Partial support for the **Privileged Instruction Set** is also included.

## Credits and License
The **RISC-V Instruction Decoder Visualizer** builds upon **rvcodec.js**, a tool developed by the [LupLab](https://luplab.cs.ucdavis.edu/) at UC Davis.

- **rvcodec.js** is distributed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html).

We are grateful to LupLab for their foundational work, which made this project possible.


## How to Use
1. Enter a RISC-V instruction in binary or hexadecimal format.
2. The tool decodes the instruction and displays the step-by-step decoding process.


## Contributing
Contributions are welcome! If you would like to enhance the tool or report issues, please feel free to open an issue or submit a pull request.

## Contact
If you have questions, suggestions, or feedback, feel free to reach out via the [GitHub Issues](https://github.com/tobias0409/riscv-instruction-decoder-visualizer/issues) section.

