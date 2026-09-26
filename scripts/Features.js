var implementedMnumonics = [
    {
        Title: "AAA",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "Operand not valid in 64-bit mode. ",
        TechURL: "https://www.felixcloutier.com/x86/AAA.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "AAD",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "Operand not valid in 64-bit mode :`(",
        TechURL: "https://www.felixcloutier.com/x86/AAD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "AAM",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "Operand not valid in 64-bit mode :`(",
        TechURL: "https://www.felixcloutier.com/x86/AAM.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "AAS",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "Operand not valid in 64-bit mode :`(",
        TechURL: "https://www.felixcloutier.com/x86/AAS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "ADC",
        ToolTip: "Adds two numbers and stores the result in Target. If the result would be to big set the Carry flag.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/ADC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "ADD",
        ToolTip: "Adds two numbers and stores the result in Target",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/ADD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "AND",
        ToolTip: "Bitwise AND",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/AND.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "ARPL",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "Operand not valid in 64-bit mode :`(",
        TechURL: "https://www.felixcloutier.com/x86/ARPL.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BOUND",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "Operand not valid in 64-bit mode :`(",
        TechURL: "https://www.felixcloutier.com/x86/BOUND.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BSF",
        ToolTip: "Bit Scan Forward returns the index of the first bit set to 1 starting at the Least Significant Bit.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/BSF.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BSR",
        ToolTip: "Bit Scan Reverse returns the index of the first bit set to 1 starting at the Least Significant Bit.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/BSR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BSWAP",
        ToolTip: "Byte Swap swaps the byte order in a 32 bit register.<br />Eg:<br />MOV eax, 0x12345678<br />BSWAP eax ; result eax will be 0x78563412",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/BSWAP.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BT",
        ToolTip: "Bit Test stores selected bit in CF flag. <br />Source is used to select the bit in target.<br />Target is Unchanged.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/BT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BTR",
        ToolTip: "Bit Test stores selected bit in CF flag. <br />Source is used to select the bit in target.<br />The selected bit in Target is then set to 0.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/BTR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "BTS",
        ToolTip: "Bit Test stores selected bit in CF flag. <br />Source is used to select the bit in target.<br />The selected bit in Target is then set to 1.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/BTS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CALL",
        ToolTip: "Pushes the next instruction (EIP) onto the stack and sets EIP to point to the entrypoint of the function being called.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CALL.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CALLF",
        ToolTip: "See CALL. CALLF is used for calling functions outside of current segment (Not relevant in x64 as there are no segments). We treat the same as Call.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CALL.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CBW",
        ToolTip: "Convert Byte to Word. AX ← sign-extend of AL.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CBW:CWDE:CDQE.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CDQE",
        ToolTip: "Convert Doubleword to Quadword. RAX ← sign-extend of EAX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CBW:CWDE:CDQE.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CDQ",
        ToolTip: "Convert Doubleword to Quadword. EDX:EAX ← sign-extend of EAX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CWD:CDQ:CQO.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CLAC",
        ToolTip: "Clear AC Flag.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CLAC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CLC",
        ToolTip: "Clear Carry Flag.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CLC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CLD",
        ToolTip: "Clear Direction Flag.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CLD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CLI",
        ToolTip: "Clear Interrupt Flag.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CLI.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CLTS",
        ToolTip: "Clear Task-Switched Flag in CR0.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CLTS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMC",
        ToolTip: "Complement Carry Flag. If CF is 0 then set CF=1. Else set CF=0.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVA",
        ToolTip: "Move if above (CF==0 and ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVAE",
        ToolTip: "Move if above or equal (CF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVB",
        ToolTip: "Move if below (CF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVBE",
        ToolTip: "Move if below or equal (CF==1 or ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVC",
        ToolTip: "Move if carry (CF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVE",
        ToolTip: "Move if equal (ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVG",
        ToolTip: "Move if greater (ZF==0 and SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVGE",
        ToolTip: "Move if greater or equal (SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVL",
        ToolTip: "Move if less (SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVLE",
        ToolTip: "Move if less or equal (ZF==1 or SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNA",
        ToolTip: "Move if not above (CF==1 or ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNAE",
        ToolTip: "Move if not above or equal (CF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNB",
        ToolTip: "Move if not below (CF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNBE",
        ToolTip: "Move if not below or equal (CF==0 and ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNC",
        ToolTip: "Move if not carry (CF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNE",
        ToolTip: "Move if not equal (ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNG",
        ToolTip: "Move if not greater (ZF==1 or SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNGE",
        ToolTip: "Move if not greater or equal (SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNL",
        ToolTip: "Move if not less (SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNLE",
        ToolTip: "Move if not less or equal (ZF==0 and SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNO",
        ToolTip: "Move if not overflow (OF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNP",
        ToolTip: "Move if not parity (PF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNS",
        ToolTip: "Move if not sign (SF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVNZ",
        ToolTip: "Move if not zero (ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVO",
        ToolTip: "Move if overflow (OF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVP",
        ToolTip: "Move if parity (PF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVPE",
        ToolTip: "Move if parity even (PF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVPO",
        ToolTip: "Move if parity odd (PF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVS",
        ToolTip: "Move if sign (SF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMOVZ",
        ToolTip: "Move if zero (ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMOVcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMP",
        ToolTip: "Compare Two Operands and set flags to indicate result. Target and Source are both unaffected.<br />temp ← Target − SignExtend(Source) ; Temp is discarded",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMP.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPS",
        ToolTip: "Compare memory locations - the value at [SI] with the value at [DI] and set flags accordingly. Size determined by Keyword (BYTE, WORD, DWORD, QWORD).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPS:CMPSB:CMPSW:CMPSD:CMPSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPSB",
        ToolTip: "Compare memory locations - the byte at [SI] with the value at [DI] and set flags accordingly.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPS:CMPSB:CMPSW:CMPSD:CMPSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPSW",
        ToolTip: "Compare memory locations - the word (2-bytes) at [SI] with the value at [DI] and set flags accordingly.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPS:CMPSB:CMPSW:CMPSD:CMPSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPSD",
        ToolTip: "Compare memory locations - the double word (4-bytes) at [SI] with the value at [DI] and set flags accordingly.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPS:CMPSB:CMPSW:CMPSD:CMPSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPSQ",
        ToolTip: "Compare memory locations - the quad word (8-bytes) at [SI] with the value at [DI] and set flags accordingly.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPS:CMPSB:CMPSW:CMPSD:CMPSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPXCHG",
        ToolTip: "Compare and Exchange - Compares the value in the AL, AX, EAX, or RAX register with the first operand (destination operand). If the two values are equal, the second operand (source operand) is loaded into the destination operand. Otherwise, the destination operand is loaded into the AL, AX, EAX or RAX register.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPXCHG.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPXCHG16B",
        ToolTip: "Compare and Exchange 16 Bytes - Compare RDX:RAX with m128. If equal, set ZF and load RCX:RBX into m128. Else, clear ZF and load m128 into RDX:RAX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPXCHG8B:CMPXCHG16B.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CMPXCHG8B",
        ToolTip: "Compare and Exchange 8 Bytes - Compare EDX:EAX with m64. If equal, set ZF and load ECX:EBX into m64. Else, clear ZF and load m64 into EDX:EAX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CMPXCHG8B:CMPXCHG16B.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CPUID",
        ToolTip: "CPU Identification - For now not really (kinda sorta :-S) implemented.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CPUID.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CQO",
        ToolTip: "Convert Quadword to Octword?. RDX:RAX ← sign-extend of RAX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CWD:CDQ:CQO.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CWD",
        ToolTip: "Convert Word to Doubleword. DX:AX ← sign-extend of AX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CWD:CDQ:CQO.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "CWDE",
        ToolTip: "Convert Word to Doubleword. EAX ← sign-extend of AX.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/CBW:CWDE:CDQE.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "DAA",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/DAA.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "DAS",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/DAS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "DEC",
        ToolTip: "Subtract one from Target",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/DEC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "DIV",
        ToolTip: "Unsigned Divide. If only one operand is supplied the A register is implied as a target.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/DIV.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "END",
        ToolTip: "Technically not an instruction but tells the program to terminate.",
        Popup: "",
        TechURL: "",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "ENTER",
        ToolTip: "Make Stack Frame for Procedure Parameters",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/ENTER.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "FWAIT",
        ToolTip: "Wait - this instruction is treated the same as a NOP.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/WAIT:FWAIT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "IDIV",
        ToolTip: "Signed Divide. If only one operand is supplied the A register is implied as a target.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/IDIV.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "IMUL",
        ToolTip: "Signed Multiply. If only one operand is supplied the A register is implied as a target.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/IMUL.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INC",
        ToolTip: "Add one to Target",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INS",
        ToolTip: "Input value from I/O port specified in DX into memory location specified in RDI. Size determined by Keyword (BYTE, WORD, DWORD, QWORD). Instruction not implemented!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INS:INSB:INSW:INSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INSB",
        ToolTip: "Input byte from I/O port specified in DX into memory location specified in RDI. Instruction not implemented!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INS:INSB:INSW:INSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INSW",
        ToolTip: "Input word (2-bytes) from I/O port specified in DX into memory location specified in RDI. Instruction not implemented!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INS:INSB:INSW:INSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INSD",
        ToolTip: "Input double word (4-bytes) from I/O port specified in DX into memory location specified in RDI. Instruction not implemented!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INS:INSB:INSW:INSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INT",
        ToolTip: "Call to Interrupt Procedure - Very similar to calling external functions. See Intterupts Section.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INTn:INTO:INT3:INT1.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INT1",
        ToolTip: "Call to Interrupt Procedure 0x01 - Very similar to calling external functions. See Intterupts Section.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INTn:INTO:INT3:INT1.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INTO",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INTn:INTO:INT3:INT1.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INVD",
        ToolTip: "Invalidate Internal Caches. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INVD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "INVLPG",
        ToolTip: "Invalidate TLB Entries. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/INVLPG.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JA",
        ToolTip: "Jump short if above (CF==0 and ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JAE",
        ToolTip: "Jump short if above or equal (CF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JB",
        ToolTip: "Jump short if below (CF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JBE",
        ToolTip: "Jump short if below or equal (CF==1 or ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JC",
        ToolTip: "Jump short if carry (CF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JE",
        ToolTip: "Jump short if equal (ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JECXZ",
        ToolTip: "Jump short if ECX register is 0.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JG",
        ToolTip: "Jump short if greater (ZF==0 and SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JGE",
        ToolTip: "Jump short if greater or equal (SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JL",
        ToolTip: "Jump short if less (SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JLE",
        ToolTip: "Jump short if less or equal (ZF==1 or SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JMP",
        ToolTip: "JMP mylabel<br />Jumps to the instruction following label.<br /><br />.code<br />mov eax, 0<br />forever:<br />inc eax<br />JMP forever ; This will result in an infinite loop as eax is incremented by one each time the JMP goes back.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/JMP.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JMPF",
        ToolTip: "Jump far. Used for accessing memory locations out of local segment. Not used here (well just treated like a standard JMP).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNA",
        ToolTip: "Jump short if not above (CF==1 or ZF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNAE",
        ToolTip: "Jump short if not above or equal (CF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNB",
        ToolTip: "Jump short if not below (CF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNBE",
        ToolTip: "Jump short if not below or equal (CF==0 and ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNC",
        ToolTip: "Jump short if not carry (CF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNE",
        ToolTip: "Jump short if not equal (ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNG",
        ToolTip: "Jump short if not greater (ZF==1 or SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNGE",
        ToolTip: "Jump short if not greater or equal (SF!== OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNL",
        ToolTip: "Jump short if not less (SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNLE",
        ToolTip: "Jump short if not less or equal (ZF==0 and SF==OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNO",
        ToolTip: "Jump short if not overflow (OF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNP",
        ToolTip: "Jump short if not parity (PF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNS",
        ToolTip: "Jump short if not sign (SF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JNZ",
        ToolTip: "Jump short if not zero (ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JO",
        ToolTip: "Jump short if overflow (OF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JP",
        ToolTip: "Jump short if parity (PF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JPE",
        ToolTip: "Jump short if parity even (PF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JPO",
        ToolTip: "Jump short if parity odd (PF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JCXZ",
        ToolTip: "Jump short if CX register is 0.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JS",
        ToolTip: "Jump short if sign (SF==1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "JZ",
        ToolTip: "Jump short if zero (ZF == 1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/Jcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "HLT",
        ToolTip: "Halt - Treated as a NOP here. In the real world this tells the CPU to stop ecexuting until ",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/HLT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LAHF",
        ToolTip: "Load Status Flags into AH Register. AH ← EFLAGS(SF:ZF:0:AF:0:PF:1:CF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LAHF.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LAR",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LAR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LDS",
        ToolTip: "Load Far Pointer - Not valid in x64. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LDS:LES:LFS:LGS:LSS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LEA",
        ToolTip: "Load Effective Address<br />Loads the address of Source into the target.Eg:<br />LEA eax, myvar ; Loads the memory address of myvar into eax rather than the value at myvar",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LEA.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LEAVE",
        ToolTip: "High Level Procedure Exit - Undoes the ENTER instruction. Set RSP to RBP, then pop RBP.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LEAVE.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LES",
        ToolTip: "Load Far Pointer - Not valid in x64. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LDS:LES:LFS:LGS:LSS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LFS",
        ToolTip: "Load Far Pointer - Not valid in x64. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LDS:LES:LFS:LGS:LSS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LGDT",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LGDT:LIDT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LGS",
        ToolTip: "Load Far Pointer - Not valid in x64. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LDS:LES:LFS:LGS:LSS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LIDT",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LGDT:LIDT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LLDT",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LLDT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LMSW",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LMSW.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LOCK",
        ToolTip: "Locks any shared memory this process may be using for the next instruction. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LOCK.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LODS",
        ToolTip: "Load value at address in RSI into A register. Size determined by Keyword (BYTE, WORD, DWORD, QWORD).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LODS:LODSB:LODSW:LODSD:LODSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LODSB",
        ToolTip: "Load byte at address in RSI into AL register.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LODS:LODSB:LODSW:LODSD:LODSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LODSW",
        ToolTip: "Load word (2-bytes) at address in RSI into AX register.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LODS:LODSB:LODSW:LODSD:LODSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LODSD",
        ToolTip: "Load double word (4-bytes) at address in RSI into EAX register.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LODS:LODSB:LODSW:LODSD:LODSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LODSQ",
        ToolTip: "Load qword (8-bytes) at address in RSI into RAX register.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LODS:LODSB:LODSW:LODSD:LODSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LOOP",
        ToolTip: "Loop works similarily to JMP in that it will Jump to the instruction after the specified label.<br />However: The loop will subtract 1 from ECX and only jump is ECX is not zero.<br /><br />mov eax, 0<br />mov ecx, 10<br />repeatme:<br />inc eax<br />loop repeatme<br /><br />The result will be eax is incemented 10 times before loop exits.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LOOP:LOOPcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LOOPE",
        ToolTip: "Decrement count (C) register; jump short if count != 0 and ZF = 1.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LOOP:LOOPcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LOOPNE",
        ToolTip: "Decrement count (C) register; jump short if count != 0 and ZF = 0.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LOOP:LOOPcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LOOPNZ",
        ToolTip: "Jump short if not zero (ZF==0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LOOP:LOOPcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LOOPZ",
        ToolTip: "Jump short if zero (ZF == 1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LOOP:LOOPcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LSL",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LSL.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LSS",
        ToolTip: "Load Far Pointer - Not valid in x64. Treated as a NOP here.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LDS:LES:LFS:LGS:LSS.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "LTR",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/LTR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MOV",
        ToolTip: "MOV Target, Source<br />Moves the value of Source into Target.<br />Target ← Source;",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MOV.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MOVS",
        ToolTip: "Move value from address in [SI] to address in [DI]. Size determined by Keyword (BYTE, WORD, DWORD, QWORD).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MOVS:MOVSB:MOVSW:MOVSD:MOVSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MOVSB",
        ToolTip: "Move byte from address in [SI] to address in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MOVS:MOVSB:MOVSW:MOVSD:MOVSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MOVSW",
        ToolTip: "Move word (2-bytes) from address in [SI] to address in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MOVS:MOVSB:MOVSW:MOVSD:MOVSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MOVSD",
        ToolTip: "Move double word (4-bytes) from address in [SI] to address in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MOVS:MOVSB:MOVSW:MOVSD:MOVSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MOVSQ",
        ToolTip: "Move quad word (8-bytes) from address in [SI] to address in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MOVS:MOVSB:MOVSW:MOVSD:MOVSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "MUL",
        ToolTip: "Unsigned Multiply. If only one operand is supplied the A register is implied as a target.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/MUL.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "NEG",
        ToolTip: "Negates the value at target (two's complement).<br />Target ← 0 – Target<br />If Target is 0 then CF set to 0 otherwise CF set to 1",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/NEG.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "NOP",
        ToolTip: "No Operation. Used as a space filler.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/NOP.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "NOT",
        ToolTip: "Bitwise NOT",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/NOT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "OR",
        ToolTip: "Bitwise OR",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/OR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "OUTS",
        ToolTip: "Output byte from memory location specified in RSI to I/O port specified in DX. Instruction not implemented yet!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/OUTS:OUTSB:OUTSW:OUTSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "OUTSB",
        ToolTip: "Output byte from memory location specified in RSI to I/O port specified in DX Instruction not implemented yet!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/OUTS:OUTSB:OUTSW:OUTSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "OUTSD",
        ToolTip: "Output double word (4-bytes) from memory location specified in RSI to I/O port specified in DX .Instruction not implemented yet!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/OUTS:OUTSB:OUTSW:OUTSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "OUTSW",
        ToolTip: "Output word (2-bytes) from memory location specified in RSI to I/O port specified in DX. Instruction not implemented yet!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/OUTS:OUTSB:OUTSW:OUTSD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "POP",
        ToolTip: "Pop a Value from the Stack<br />Pops the value at ESP into The Target (memory or a Register) and then increments ESP by the Source.<br>POP eax, 4 ; Copies 4 bytes into eax and then increments ESP by 4.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/POP.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "POPA",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/POPA:POPAD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "POPAD",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/POPA:POPAD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "POPF",
        ToolTip: "Pop Stack into EFLAGS Register. Pop top of stack into lower 16 bits of EFLAGS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/POPF:POPFD:POPFQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "POPFD",
        ToolTip: "Pop Stack into EFLAGS Register. Pop top of stack into EFLAGS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/POPF:POPFD:POPFQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "POPFQ",
        ToolTip: "Pop Stack into EFLAGS Register. Pop top of stack and zero-extend into RFLAGS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/POPF:POPFD:POPFQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "PUSH",
        ToolTip: "Push Value Onto the Stack<br />Pushes the value at Target (memory or a Register) onto The Stack and then decrements ESP by the size of Target.<br>PUSH eax ; Decrements ESP by 4 and Copies 4 bytes from eax onto the location at ESP. <br />For memory locations use a size prefix to tell the compiler how many bytes to use:<br />PUSH WORD [myvar] ; Tells Push to copy 2 bytes (WORD) from memory to the stack.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/PUSH.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "PUSHA",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/PUSHA:PUSHAD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "PUSHAD",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/PUSHA:PUSHAD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "PUSHF",
        ToolTip: "Push EFLAGS Register onto the Stack. Push lower 16 bits of EFLAGS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/PUSHF:PUSHFD:PUSHFQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "PUSHFD",
        ToolTip: "Push EFLAGS Register onto the Stack. Push EFLAGS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/PUSHF:PUSHFD:PUSHFQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "PUSHFQ",
        ToolTip: "Push EFLAGS Register onto the Stack. Push RFLAGS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/PUSHF:PUSHFD:PUSHFQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "RCL",
        ToolTip: "Bitwise Rotate Left through Carry<br />Rotates bits left. Same as ROL except the Carry flag is moved to the LSB and the MSB is moved to the Carry Flag.<br />Source indicates the number of times to shift.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RCL:RCR:ROL:ROR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "RCR",
        ToolTip: "Bitwise Rotate Right through Carry<br />Rotates bits right. Same as ROR except the Carry flag is moved to the MSB and the LSB is moved to the Carry Flag.<br />Source indicates the number of times to shift.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RCL:RCR:ROL:ROR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "REP",
        ToolTip: "Repeat Instruction until RCX or (E)CX == 0.<br />REP is only valid for INS, MOVS, OUTS, LODS, and STOS<br />REPE, REPZ, REPNE, REPNZ are only valid for CMPS and SCAS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/REP:REPE:REPZ:REPNE:REPNZ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "REPE",
        ToolTip: "Repeat Instruction until RCX or (E)CX == 0 or ZF == 0.<br />REP is only valid for INS, MOVS, OUTS, LODS, and STOS<br />REPE, REPZ, REPNE, REPNZ are only valid for CMPS and SCAS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/REP:REPE:REPZ:REPNE:REPNZ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "REPNE",
        ToolTip: "Repeat Instruction until RCX or (E)CX == 0 or ZF == 1.<br />REP is only valid for INS, MOVS, OUTS, LODS, and STOS<br />REPE, REPZ, REPNE, REPNZ are only valid for CMPS and SCAS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/REP:REPE:REPZ:REPNE:REPNZ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "REPNZ",
        ToolTip: "Repeat Instruction until RCX or (E)CX == 0 or ZF == 1.<br />REP is only valid for INS, MOVS, OUTS, LODS, and STOS<br />REPE, REPZ, REPNE, REPNZ are only valid for CMPS and SCAS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/REP:REPE:REPZ:REPNE:REPNZ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "REPZ",
        ToolTip: "Repeat Instruction until RCX or (E)CX == 0 or ZF == 0.<br />REP is only valid for INS, MOVS, OUTS, LODS, and STOS<br />REPE, REPZ, REPNE, REPNZ are only valid for CMPS and SCAS.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/REP:REPE:REPZ:REPNE:REPNZ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "RET",
        ToolTip: "Returns from a function call. Pops a 4 byte value from the stack and places in EIP. (Must be the value that the CALL instruction pushed onto the stack; Otherwise its an imbalanced stack and the program will throw a fit!)",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RET.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "RETF",
        ToolTip: "See RET. RETF is used for calling functions outside of current segment. We treat the same as Call.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RET.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "RETN",
        ToolTip: "See RET. We treat the same as Call.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RET.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "ROL",
        ToolTip: "Bitwise Rotate Left<br />Rotates bits left. The Most signifigant bit is then pushed to the Least signifigant bit.<br />Source indicates the number of times to shift.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RCL:RCR:ROL:ROR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "ROR",
        ToolTip: "Bitwise Rotate Right<br />Rotates bits right. The Least signifigant bit is then pushed to the Most signifigant bit.<br />Source indicates the number of times to shift.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/RCL:RCR:ROL:ROR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SAHF",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SAHF.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SAL",
        ToolTip: "See SHL. The shift arithmetic left (SAL) and shift logical left (SHL) instructions perform the same operation.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SAL:SAR:SHL:SHR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SAR",
        ToolTip: "Shift Bits Right. If the MSB was a 1 then 1's are Added to the MSB. Otherwise Zeros are Added to the MSB.<br />Source indicates the number of times to shift.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SAL:SAR:SHL:SHR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SBB",
        ToolTip: "Subtracts the second operand from the first and stores the result in the first with a borrow from the Carry Flag.<br />Target ← (Target – (Source + CF));",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SBB.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SCAS",
        ToolTip: "Scan String - Compare RAX with quadword at [RDI] then set status flags. Increment or Decrement RDI depending on DF.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SCAS:SCASB:SCASW:SCASD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SCASB",
        ToolTip: "Scan String - Compare AL with byte at [RDI] then set status flags. Increment or Decrement RDI depending on DF.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SCAS:SCASB:SCASW:SCASD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SCASD",
        ToolTip: "Scan String - Compare EAX with double word (4-bytes) at [RDI] then set status flags. Increment or Decrement RDI depending on DF.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SCAS:SCASB:SCASW:SCASD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SCASQ",
        ToolTip: "Scan String - Compare RAX with quad word (8-bytes) at [RDI] then set status flags. Increment or Decrement RDI depending on DF.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SCAS:SCASB:SCASW:SCASD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SCASW",
        ToolTip: "Scan String - Compare AX with word (2-bytes) at [RDI] then set status flags. Increment or Decrement RDI depending on DF.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SCAS:SCASB:SCASW:SCASD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETA",
        ToolTip: "Set byte if above (CF=0 and ZF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETAE",
        ToolTip: "Set byte if above or equal (CF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETB",
        ToolTip: "Set byte if below (CF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETBE",
        ToolTip: "Set byte if below or equal (CF=1 or ZF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETC",
        ToolTip: "Set byte if carry (CF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETE",
        ToolTip: "Set byte if equal (ZF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETG",
        ToolTip: "Set byte if greater (ZF=0 and SF=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETGE",
        ToolTip: "Set byte if greater or equal (SF=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETL",
        ToolTip: "Set byte if less (SF!=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETLE",
        ToolTip: "Set byte if less or equal (ZF=1 or SF!=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNA",
        ToolTip: "Set byte if not above (CF=1 or ZF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNAE",
        ToolTip: "Set byte if not above or equal (CF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNB",
        ToolTip: "Set byte if not below (CF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNBE",
        ToolTip: "Set byte if not below or equal (CF=0 and ZF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNC",
        ToolTip: "Set byte if not carry (CF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNE",
        ToolTip: "Set byte if not equal (ZF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNG",
        ToolTip: "Set byte if not greater (ZF=1 or SF!=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNGE",
        ToolTip: "Set byte if not greater or equal (SF!=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNL",
        ToolTip: "Set byte if not less (SF=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNLE",
        ToolTip: "Set byte if not less or equal (ZF=0 and SF=OF).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNO",
        ToolTip: "Set byte if not overflow (OF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNP",
        ToolTip: "Set byte if not parity (PF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNS",
        ToolTip: "Set byte if not sign (SF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETNZ",
        ToolTip: "Set byte if not zero (ZF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETO",
        ToolTip: "Set byte if overflow (OF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETP",
        ToolTip: "Set byte if parity (PF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETPE",
        ToolTip: "Set byte if parity even (PF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETPO",
        ToolTip: "Set byte if parity odd (PF=0).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETS",
        ToolTip: "Set byte if sign (SF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SETZ",
        ToolTip: "Set byte if zero (ZF=1).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SETcc.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SGDT",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SGDT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SHL",
        ToolTip: "Bitwise SHL<br />Source indicates the number of times to shift.<br />CF ← MSB←LSB ← 0",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SAL:SAR:SHL:SHR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SHR",
        ToolTip: "Shift Bits Right. Zeros are Added to the MSB<br />Source indicates the number of times to shift.<br />0 → MSB→LSB → CF",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SAL:SAR:SHL:SHR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SIDT",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SIDT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SLDT",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SLDT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SMSW",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SMSW.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STAC",
        ToolTip: "Set Alignment Flag (AC) to 1 in EFLAGS Register",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STAC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STC",
        ToolTip: "Set Carry Flag (CF) to 1 in EFLAGS Register",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STC.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STD",
        ToolTip: "Set Direction Flag (DF) to 1 in EFLAGS Register",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STI",
        ToolTip: "Set Interrupt Flag (IF) to 1 in EFLAGS Register",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STI.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STOS",
        ToolTip: "Store value in A register to address located in [DI]. Size determined by Keyword (BYTE, WORD, DWORD, QWORD).",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STOS:STOSB:STOSW:STOSD:STOSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STOSB",
        ToolTip: "Store byte value in AL register to address located in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STOS:STOSB:STOSW:STOSD:STOSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STOSW",
        ToolTip: "Store word value in AX register to address located in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STOS:STOSB:STOSW:STOSD:STOSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STOSD",
        ToolTip: "Store double word value in EAX register to address located in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STOS:STOSB:STOSW:STOSD:STOSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STOSQ",
        ToolTip: "Store quad word value in RAX register to address located in [DI].",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STOS:STOSB:STOSW:STOSD:STOSQ.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "STR",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/STR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "SUB",
        ToolTip: "Subtracts the second operand from the first and stores the result in the first.<br />Target ← (Target – Source);",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/SUB.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "TEST",
        ToolTip: "Logical Compare - Performs a bitwise AND operation on Source and Target and updates flags.<br />The result is then discarded leaving Source and Target unchanged.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/TEST.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "VERR",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/VERR:VERW.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "VERW",
        ToolTip: "Operand is a protected mode operation and not valid in this emulator!",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/VERR:VERW.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "WAIT",
        ToolTip: "Wait - this instruction is treated the same as a NOP.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/WAIT:FWAIT.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "WBINVD",
        ToolTip: "Write Back and Invalidate Cache - this instruction is treated the same as a NOP.",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/WBINVD.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "XCHG",
        ToolTip: "Exchange Register/Memory with Register<br />Swaps the value at target with the value at source. <br />This is one of the few instances where both Target and Source are Affected.<br />TEMP ← Target;<br />Target ← Source;<br />Source ← TEMP;<br />",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/XCHG.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    },
    {
        Title: "XOR",
        ToolTip: "Bitwise XOR",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/XOR.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
    }
];

var unimplementedMnumonics = [
    {
        Title: "ADCX",
        ToolTip: "Unsigned Integer Addition of Two Operands with Carry Flag",
        TechURL: "https://www.felixcloutier.com/x86/ADCX.html"
    },
    {
        Title: "ADDPD",
        ToolTip: "Add Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ADDPD.html"
    },
    {
        Title: "ADDPS",
        ToolTip: "Add Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ADDPS.html"
    },
    {
        Title: "ADDSD",
        ToolTip: "Add Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ADDSD.html"
    },
    {
        Title: "ADDSS",
        ToolTip: "Add Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ADDSS.html"
    },
    {
        Title: "ADDSUBPD",
        ToolTip: "Packed Double-FP Add/Subtract",
        TechURL: "https://www.felixcloutier.com/x86/ADDSUBPD.html"
    },
    {
        Title: "ADDSUBPS",
        ToolTip: "Packed Single-FP Add/Subtract",
        TechURL: "https://www.felixcloutier.com/x86/ADDSUBPS.html"
    },
    {
        Title: "ADOX",
        ToolTip: "Unsigned Integer Addition of Two Operands with Overflow Flag",
        TechURL: "https://www.felixcloutier.com/x86/ADOX.html"
    },
    {
        Title: "AESDEC",
        ToolTip: "Perform One Round of an AES Decryption Flow",
        TechURL: "https://www.felixcloutier.com/x86/AESDEC.html"
    },
    {
        Title: "AESDECLAST",
        ToolTip: "Perform Last Round of an AES Decryption Flow",
        TechURL: "https://www.felixcloutier.com/x86/AESDECLAST.html"
    },
    {
        Title: "AESENC",
        ToolTip: "Perform One Round of an AES Encryption Flow",
        TechURL: "https://www.felixcloutier.com/x86/AESENC.html"
    },
    {
        Title: "AESENCLAST",
        ToolTip: "Perform Last Round of an AES Encryption Flow",
        TechURL: "https://www.felixcloutier.com/x86/AESENCLAST.html"
    },
    {
        Title: "AESIMC",
        ToolTip: "Perform the AES InvMixColumn Transformation",
        TechURL: "https://www.felixcloutier.com/x86/AESIMC.html"
    },
    {
        Title: "AESKEYGENASSIST",
        ToolTip: "AES Round Key Generation Assist",
        TechURL: "https://www.felixcloutier.com/x86/AESKEYGENASSIST.html"
    },
    {
        Title: "ANDN",
        ToolTip: "Logical AND NOT",
        TechURL: "https://www.felixcloutier.com/x86/ANDN.html"
    },
    {
        Title: "ANDNPD",
        ToolTip: "Bitwise Logical AND NOT of Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ANDNPD.html"
    },
    {
        Title: "ANDNPS",
        ToolTip: "Bitwise Logical AND NOT of Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ANDNPS.html"
    },
    {
        Title: "ANDPD",
        ToolTip: "Bitwise Logical AND of Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ANDPD.html"
    },
    {
        Title: "ANDPS",
        ToolTip: "Bitwise Logical AND of Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ANDPS.html"
    },
    {
        Title: "BEXTR",
        ToolTip: "Bit Field Extract",
        TechURL: "https://www.felixcloutier.com/x86/BEXTR.html"
    },
    {
        Title: "BLENDPD",
        ToolTip: "Blend Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/BLENDPD.html"
    },
    {
        Title: "BLENDPS",
        ToolTip: "Blend Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/BLENDPS.html"
    },
    {
        Title: "BLENDVPD",
        ToolTip: "Variable Blend Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/BLENDVPD.html"
    },
    {
        Title: "BLENDVPS",
        ToolTip: "Variable Blend Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/BLENDVPS.html"
    },
    {
        Title: "BLSI",
        ToolTip: "Extract Lowest Set Isolated Bit",
        TechURL: "https://www.felixcloutier.com/x86/BLSI.html"
    },
    {
        Title: "BLSMSK",
        ToolTip: "Get Mask Up to Lowest Set Bit",
        TechURL: "https://www.felixcloutier.com/x86/BLSMSK.html"
    },
    {
        Title: "BLSR",
        ToolTip: "Reset Lowest Set Bit",
        TechURL: "https://www.felixcloutier.com/x86/BLSR.html"
    },
    {
        Title: "BNDCL",
        ToolTip: "Check Lower Bound",
        TechURL: "https://www.felixcloutier.com/x86/BNDCL.html"
    },
    {
        Title: "BNDCN",
        ToolTip: "Check Upper Bound",
        TechURL: "https://www.felixcloutier.com/x86/BNDCL.html"
    },
    {
        Title: "BNDCU",
        ToolTip: "Check Upper Bound",
        TechURL: "https://www.felixcloutier.com/x86/BNDCU:BNDCN.html"
    },
    {
        Title: "BNDLDX",
        ToolTip: "Load Extended Bounds Using Address Translation",
        TechURL: "https://www.felixcloutier.com/x86/BNDLDX.html"
    },
    {
        Title: "BNDMK",
        ToolTip: "Make Bounds",
        TechURL: "https://www.felixcloutier.com/x86/BNDMK.html"
    },
    {
        Title: "BNDMOV",
        ToolTip: "Move Bounds",
        TechURL: "https://www.felixcloutier.com/x86/BNDMOV.html"
    },
    {
        Title: "BNDSTX",
        ToolTip: "Store Extended Bounds Using Address Translation",
        TechURL: "https://www.felixcloutier.com/x86/BNDSTX.html"
    },
    {
        Title: "BTC",
        ToolTip: "Bit Test and Complement",
        TechURL: "https://www.felixcloutier.com/x86/BTC.html"
    },
    {
        Title: "BZHI",
        ToolTip: "Zero High Bits Starting with Specified Bit Position",
        TechURL: "https://www.felixcloutier.com/x86/BZHI.html"
    },
    {
        Title: "CLDEMOTE",
        ToolTip: "Cache Line Demote",
        TechURL: "https://www.felixcloutier.com/x86/CLDEMOTE.html"
    },
    {
        Title: "CLFLUSH",
        ToolTip: "Flush Cache Line",
        TechURL: "https://www.felixcloutier.com/x86/CLFLUSH.html"
    },
    {
        Title: "CLFLUSHOPT",
        ToolTip: "Flush Cache Line Optimized",
        TechURL: "https://www.felixcloutier.com/x86/CLFLUSHOPT.html"
    },
    {
        Title: "CLWB",
        ToolTip: "Cache Line Write Back",
        TechURL: "https://www.felixcloutier.com/x86/CLWB.html"
    },
    {
        Title: "CMPPD",
        ToolTip: "Compare Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/CMPPD.html"
    },
    {
        Title: "CMPPS",
        ToolTip: "Compare Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/CMPPS.html"
    },
    {
        Title: "CMPSS",
        ToolTip: "Compare Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/CMPSS.html"
    },
    {
        Title: "COMISD",
        ToolTip: "Compare Scalar Ordered Double-Precision Floating-Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/COMISD.html"
    },
    {
        Title: "COMISS",
        ToolTip: "Compare Scalar Ordered Single-Precision Floating-Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/COMISS.html"
    },
    {
        Title: "CRC32",
        ToolTip: "Accumulate CRC32 Value",
        TechURL: "https://www.felixcloutier.com/x86/CRC32.html"
    },
    {
        Title: "CVTDQ2PD",
        ToolTip: "Convert Packed Doubleword Integers to Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTDQ2PD.html"
    },
    {
        Title: "CVTDQ2PS",
        ToolTip: "Convert Packed Doubleword Integers to Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTDQ2PS.html"
    },
    {
        Title: "CVTPD2DQ",
        ToolTip: "Convert Packed Double-Precision Floating-Point Values to Packed Doubleword Integers",
        TechURL: "https://www.felixcloutier.com/x86/CVTPD2DQ.html"
    },
    {
        Title: "CVTPD2PI",
        ToolTip: "Convert Packed Double-Precision FP Values to Packed Dword Integers",
        TechURL: "https://www.felixcloutier.com/x86/CVTPD2PI.html"
    },
    {
        Title: "CVTPD2PS",
        ToolTip: "Convert Packed Double-Precision Floating-Point Values to Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTPD2PS.html"
    },
    {
        Title: "CVTPI2PD",
        ToolTip: "Convert Packed Dword Integers to Packed Double-Precision FP Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTPI2PD.html"
    },
    {
        Title: "CVTPI2PS",
        ToolTip: "Convert Packed Dword Integers to Packed Single-Precision FP Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTPI2PS.html"
    },
    {
        Title: "CVTPS2DQ",
        ToolTip: "Convert Packed Single-Precision Floating-Point Values to Packed Signed Doubleword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTPS2DQ.html"
    },
    {
        Title: "CVTPS2PD",
        ToolTip: "Convert Packed Single-Precision Floating-Point Values to Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTPS2PD.html"
    },
    {
        Title: "CVTPS2PI",
        ToolTip: "Convert Packed Single-Precision FP Values to Packed Dword Integers",
        TechURL: "https://www.felixcloutier.com/x86/CVTPS2PI.html"
    },
    {
        Title: "CVTSD2SI",
        ToolTip: "Convert Scalar Double-Precision Floating-Point Value to Doubleword Integer",
        TechURL: "https://www.felixcloutier.com/x86/CVTSD2SI.html"
    },
    {
        Title: "CVTSD2SS",
        ToolTip: "Convert Scalar Double-Precision Floating-Point Value to Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/CVTSD2SS.html"
    },
    {
        Title: "CVTSI2SD",
        ToolTip: "Convert Doubleword Integer to Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/CVTSI2SD.html"
    },
    {
        Title: "CVTSI2SS",
        ToolTip: "Convert Doubleword Integer to Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/CVTSI2SS.html"
    },
    {
        Title: "CVTSS2SD",
        ToolTip: "Convert Scalar Single-Precision Floating-Point Value to Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/CVTSS2SD.html"
    },
    {
        Title: "CVTSS2SI",
        ToolTip: "Convert Scalar Single-Precision Floating-Point Value to Doubleword Integer",
        TechURL: "https://www.felixcloutier.com/x86/CVTSS2SI.html"
    },
    {
        Title: "CVTTPD2DQ",
        ToolTip: "Convert with Truncation Packed Double-Precision Floating-Point Values to Packed Doubleword Integers",
        TechURL: "https://www.felixcloutier.com/x86/CVTTPD2DQ.html"
    },
    {
        Title: "CVTTPD2PI",
        ToolTip: "Convert with Truncation Packed Double-Precision FP Values to Packed Dword Integers",
        TechURL: "https://www.felixcloutier.com/x86/CVTTPD2PI.html"
    },
    {
        Title: "CVTTPS2DQ",
        ToolTip: "Convert with Truncation Packed Single-Precision Floating-Point Values to Packed Signed Doubleword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/CVTTPS2DQ.html"
    },
    {
        Title: "CVTTPS2PI",
        ToolTip: "Convert with Truncation Packed Single-Precision FP Values to Packed Dword Integers",
        TechURL: "https://www.felixcloutier.com/x86/CVTTPS2PI.html"
    },
    {
        Title: "CVTTSD2SI",
        ToolTip: "Convert with Truncation Scalar Double-Precision Floating-Point Value to Signed Integer",
        TechURL: "https://www.felixcloutier.com/x86/CVTTSD2SI.html"
    },
    {
        Title: "CVTTSS2SI",
        ToolTip: "Convert with Truncation Scalar Single-Precision Floating-Point Value to Integer",
        TechURL: "https://www.felixcloutier.com/x86/CVTTSS2SI.html"
    },
    {
        Title: "DIVPD",
        ToolTip: "Divide Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/DIVPD.html"
    },
    {
        Title: "DIVPS",
        ToolTip: "Divide Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/DIVPS.html"
    },
    {
        Title: "DIVSD",
        ToolTip: "Divide Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/DIVSD.html"
    },
    {
        Title: "DIVSS",
        ToolTip: "Divide Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/DIVSS.html"
    },
    {
        Title: "DPPD",
        ToolTip: "Dot Product of Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/DPPD.html"
    },
    {
        Title: "DPPS",
        ToolTip: "Dot Product of Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/DPPS.html"
    },
    {
        Title: "EMMS",
        ToolTip: "Empty MMX Technology State",
        TechURL: "https://www.felixcloutier.com/x86/EMMS.html"
    },
    {
        Title: "EXTRACTPS",
        ToolTip: "Extract Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/EXTRACTPS.html"
    },
    {
        Title: "F2XM1",
        ToolTip: "Compute 2x–1",
        TechURL: "https://www.felixcloutier.com/x86/F2XM1.html"
    },
    {
        Title: "FABS",
        ToolTip: "Absolute Value",
        TechURL: "https://www.felixcloutier.com/x86/FABS.html"
    },
    {
        Title: "FADD",
        ToolTip: "Add",
        TechURL: "https://www.felixcloutier.com/x86/FADD:FADDP:FIADD.html"
    },
    {
        Title: "FADDP",
        ToolTip: "Add",
        TechURL: "https://www.felixcloutier.com/x86/FADD:FADDP:FIADD.html"
    },
    {
        Title: "FBLD",
        ToolTip: "Load Binary Coded Decimal",
        TechURL: "https://www.felixcloutier.com/x86/FBLD.html"
    },
    {
        Title: "FBSTP",
        ToolTip: "Store BCD Integer and Pop",
        TechURL: "https://www.felixcloutier.com/x86/FBSTP.html"
    },
    {
        Title: "FCHS",
        ToolTip: "Change Sign",
        TechURL: "https://www.felixcloutier.com/x86/FCHS.html"
    },
    {
        Title: "FCLEX",
        ToolTip: "Clear Exceptions",
        TechURL: "https://www.felixcloutier.com/x86/FCLEX:FNCLEX.html"
    },
    {
        Title: "FCMOVcc",
        ToolTip: "Floating-Point Conditional Move",
        TechURL: "https://www.felixcloutier.com/x86/FCMOVcc.html"
    },
    {
        Title: "FCOM",
        ToolTip: "Compare Floating Point Values",
        TechURL: "https://www.felixcloutier.com/x86/FCOM:FCOMP:FCOMPP.html"
    },
    {
        Title: "FCOMI",
        ToolTip: "Compare Floating Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/FCOMI:FCOMIP:FUCOMI:FUCOMIP.html"
    },
    {
        Title: "FCOMIP",
        ToolTip: "Compare Floating Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/FCOMI:FCOMIP:FUCOMI:FUCOMIP.html"
    },
    {
        Title: "FCOMP",
        ToolTip: "Compare Floating Point Values",
        TechURL: "https://www.felixcloutier.com/x86/FCOM:FCOMP:FCOMPP.html"
    },
    {
        Title: "FCOMPP",
        ToolTip: "Compare Floating Point Values",
        TechURL: "https://www.felixcloutier.com/x86/FCOM:FCOMP:FCOMPP.html"
    },
    {
        Title: "FCOS",
        ToolTip: "Cosine",
        TechURL: "https://www.felixcloutier.com/x86/FCOS.html"
    },
    {
        Title: "FDECSTP",
        ToolTip: "Decrement Stack-Top Pointer",
        TechURL: "https://www.felixcloutier.com/x86/FDECSTP.html"
    },
    {
        Title: "FDIV",
        ToolTip: "Divide",
        TechURL: "https://www.felixcloutier.com/x86/FDIV:FDIVP:FIDIV.html"
    },
    {
        Title: "FDIVP",
        ToolTip: "Divide",
        TechURL: "https://www.felixcloutier.com/x86/FDIV:FDIVP:FIDIV.html"
    },
    {
        Title: "FDIVR",
        ToolTip: "Reverse Divide",
        TechURL: "https://www.felixcloutier.com/x86/FDIVR:FDIVRP:FIDIVR.html"
    },
    {
        Title: "FDIVRP",
        ToolTip: "Reverse Divide",
        TechURL: "https://www.felixcloutier.com/x86/FDIVR:FDIVRP:FIDIVR.html"
    },
    {
        Title: "FFREE",
        ToolTip: "Free Floating-Point Register",
        TechURL: "https://www.felixcloutier.com/x86/FFREE.html"
    },
    {
        Title: "FIADD",
        ToolTip: "Add",
        TechURL: "https://www.felixcloutier.com/x86/FADD:FADDP:FIADD.html"
    },
    {
        Title: "FICOM",
        ToolTip: "Compare Integer",
        TechURL: "https://www.felixcloutier.com/x86/FICOM:FICOMP.html"
    },
    {
        Title: "FICOMP",
        ToolTip: "Compare Integer",
        TechURL: "https://www.felixcloutier.com/x86/FICOM:FICOMP.html"
    },
    {
        Title: "FIDIV",
        ToolTip: "Divide",
        TechURL: "https://www.felixcloutier.com/x86/FDIV:FDIVP:FIDIV.html"
    },
    {
        Title: "FIDIVR",
        ToolTip: "Reverse Divide",
        TechURL: "https://www.felixcloutier.com/x86/FDIVR:FDIVRP:FIDIVR.html"
    },
    {
        Title: "FILD",
        ToolTip: "Load Integer",
        TechURL: "https://www.felixcloutier.com/x86/FILD.html"
    },
    {
        Title: "FIMUL",
        ToolTip: "Multiply",
        TechURL: "https://www.felixcloutier.com/x86/FMUL:FMULP:FIMUL.html"
    },
    {
        Title: "FINCSTP",
        ToolTip: "Increment Stack-Top Pointer",
        TechURL: "https://www.felixcloutier.com/x86/FINCSTP.html"
    },
    {
        Title: "FINIT",
        ToolTip: "Initialize Floating-Point Unit",
        TechURL: "https://www.felixcloutier.com/x86/FINIT:FNINIT.html"
    },
    {
        Title: "FIST",
        ToolTip: "Store Integer",
        TechURL: "https://www.felixcloutier.com/x86/FIST:FISTP.html"
    },
    {
        Title: "FISTP",
        ToolTip: "Store Integer",
        TechURL: "https://www.felixcloutier.com/x86/FIST:FISTP.html"
    },
    {
        Title: "FISTTP",
        ToolTip: "Store Integer with Truncation",
        TechURL: "https://www.felixcloutier.com/x86/FISTTP.html"
    },
    {
        Title: "FISUB",
        ToolTip: "Subtract",
        TechURL: "https://www.felixcloutier.com/x86/FSUB:FSUBP:FISUB.html"
    },
    {
        Title: "FISUBR",
        ToolTip: "Reverse Subtract",
        TechURL: "https://www.felixcloutier.com/x86/FSUBR:FSUBRP:FISUBR.html"
    },
    {
        Title: "FLD",
        ToolTip: "Load Floating Point Value",
        TechURL: "https://www.felixcloutier.com/x86/FLD.html"
    },
    {
        Title: "FLD1",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FLDCW",
        ToolTip: "Load x87 FPU Control Word",
        TechURL: "https://www.felixcloutier.com/x86/FLDCW.html"
    },
    {
        Title: "FLDENV",
        ToolTip: "Load x87 FPU Environment",
        TechURL: "https://www.felixcloutier.com/x86/FLDENV.html"
    },
    {
        Title: "FLDL2E",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FLDL2T",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FLDLG2",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FLDLN2",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FLDPI",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FLDZ",
        ToolTip: "Load Constant",
        TechURL: "https://www.felixcloutier.com/x86/FLD1:FLDL2T:FLDL2E:FLDPI:FLDLG2:FLDLN2:FLDZ.html"
    },
    {
        Title: "FMUL",
        ToolTip: "Multiply",
        TechURL: "https://www.felixcloutier.com/x86/FMUL:FMULP:FIMUL.html"
    },
    {
        Title: "FMULP",
        ToolTip: "Multiply",
        TechURL: "https://www.felixcloutier.com/x86/FMUL:FMULP:FIMUL.html"
    },
    {
        Title: "FNCLEX",
        ToolTip: "Clear Exceptions",
        TechURL: "https://www.felixcloutier.com/x86/FCLEX:FNCLEX.html"
    },
    {
        Title: "FNINIT",
        ToolTip: "Initialize Floating-Point Unit",
        TechURL: "https://www.felixcloutier.com/x86/FINIT:FNINIT.html"
    },
    {
        Title: "FNOP",
        ToolTip: "No Operation",
        TechURL: "https://www.felixcloutier.com/x86/FNOP.html"
    },
    {
        Title: "FNSAVE",
        ToolTip: "Store x87 FPU State",
        TechURL: "https://www.felixcloutier.com/x86/FSAVE:FNSAVE.html"
    },
    {
        Title: "FNSTCW",
        ToolTip: "Store x87 FPU Control Word",
        TechURL: "https://www.felixcloutier.com/x86/FSTCW:FNSTCW.html"
    },
    {
        Title: "FNSTENV",
        ToolTip: "Store x87 FPU Environment",
        TechURL: "https://www.felixcloutier.com/x86/FSTENV:FNSTENV.html"
    },
    {
        Title: "FNSTSW",
        ToolTip: "Store x87 FPU Status Word",
        TechURL: "https://www.felixcloutier.com/x86/FSTSW:FNSTSW.html"
    },
    {
        Title: "FPATAN",
        ToolTip: "Partial Arctangent",
        TechURL: "https://www.felixcloutier.com/x86/FPATAN.html"
    },
    {
        Title: "FPREM",
        ToolTip: "Partial Remainder",
        TechURL: "https://www.felixcloutier.com/x86/FPREM.html"
    },
    {
        Title: "FPREM1",
        ToolTip: "Partial Remainder",
        TechURL: "https://www.felixcloutier.com/x86/FPREM1.html"
    },
    {
        Title: "FPTAN",
        ToolTip: "Partial Tangent",
        TechURL: "https://www.felixcloutier.com/x86/FPTAN.html"
    },
    {
        Title: "FRNDINT",
        ToolTip: "Round to Integer",
        TechURL: "https://www.felixcloutier.com/x86/FRNDINT.html"
    },
    {
        Title: "FRSTOR",
        ToolTip: "Restore x87 FPU State",
        TechURL: "https://www.felixcloutier.com/x86/FRSTOR.html"
    },
    {
        Title: "FSAVE",
        ToolTip: "Store x87 FPU State",
        TechURL: "https://www.felixcloutier.com/x86/FSAVE:FNSAVE.html"
    },
    {
        Title: "FSCALE",
        ToolTip: "Scale",
        TechURL: "https://www.felixcloutier.com/x86/FSCALE.html"
    },
    {
        Title: "FSIN",
        ToolTip: "Sine",
        TechURL: "https://www.felixcloutier.com/x86/FSIN.html"
    },
    {
        Title: "FSINCOS",
        ToolTip: "Sine and Cosine",
        TechURL: "https://www.felixcloutier.com/x86/FSINCOS.html"
    },
    {
        Title: "FSQRT",
        ToolTip: "Square Root",
        TechURL: "https://www.felixcloutier.com/x86/FSQRT.html"
    },
    {
        Title: "FST",
        ToolTip: "Store Floating Point Value",
        TechURL: "https://www.felixcloutier.com/x86/FST:FSTP.html"
    },
    {
        Title: "FSTCW",
        ToolTip: "Store x87 FPU Control Word",
        TechURL: "https://www.felixcloutier.com/x86/FSTCW:FNSTCW.html"
    },
    {
        Title: "FSTENV",
        ToolTip: "Store x87 FPU Environment",
        TechURL: "https://www.felixcloutier.com/x86/FSTENV:FNSTENV.html"
    },
    {
        Title: "FSTP",
        ToolTip: "Store Floating Point Value",
        TechURL: "https://www.felixcloutier.com/x86/FST:FSTP.html"
    },
    {
        Title: "FSTSW",
        ToolTip: "Store x87 FPU Status Word",
        TechURL: "https://www.felixcloutier.com/x86/FSTSW:FNSTSW.html"
    },
    {
        Title: "FSUB",
        ToolTip: "Subtract",
        TechURL: "https://www.felixcloutier.com/x86/FSUB:FSUBP:FISUB.html"
    },
    {
        Title: "FSUBP",
        ToolTip: "Subtract",
        TechURL: "https://www.felixcloutier.com/x86/FSUB:FSUBP:FISUB.html"
    },
    {
        Title: "FSUBR",
        ToolTip: "Reverse Subtract",
        TechURL: "https://www.felixcloutier.com/x86/FSUBR:FSUBRP:FISUBR.html"
    },
    {
        Title: "FSUBRP",
        ToolTip: "Reverse Subtract",
        TechURL: "https://www.felixcloutier.com/x86/FSUBR:FSUBRP:FISUBR.html"
    },
    {
        Title: "FTST",
        ToolTip: "TEST",
        TechURL: "https://www.felixcloutier.com/x86/FTST.html"
    },
    {
        Title: "FUCOM",
        ToolTip: "Unordered Compare Floating Point Values",
        TechURL: "https://www.felixcloutier.com/x86/FUCOM:FUCOMP:FUCOMPP.html"
    },
    {
        Title: "FUCOMI",
        ToolTip: "Compare Floating Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/FCOMI:FCOMIP:FUCOMI:FUCOMIP.html"
    },
    {
        Title: "FUCOMIP",
        ToolTip: "Compare Floating Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/FCOMI:FCOMIP:FUCOMI:FUCOMIP.html"
    },
    {
        Title: "FUCOMP",
        ToolTip: "Unordered Compare Floating Point Values",
        TechURL: "https://www.felixcloutier.com/x86/FCOMI:FCOMIP:FUCOMI:FUCOMIP.html"
    },
    {
        Title: "FUCOMPP",
        ToolTip: "Unordered Compare Floating Point Values",
        TechURL: "https://www.felixcloutier.com/x86/FUCOM:FUCOMP:FUCOMPP.html"
    },
    {
        Title: "FXAM",
        ToolTip: "Examine Floating-Point",
        TechURL: "https://www.felixcloutier.com/x86/FXAM.html"
    },
    {
        Title: "FXCH",
        ToolTip: "Exchange Register Contents",
        TechURL: "https://www.felixcloutier.com/x86/FXCH.html"
    },
    {
        Title: "FXRSTOR",
        ToolTip: "Restore x87 FPU, MMX, XMM, and MXCSR State",
        TechURL: "https://www.felixcloutier.com/x86/FXRSTOR.html"
    },
    {
        Title: "FXSAVE",
        ToolTip: "Save x87 FPU, MMX Technology, and SSE State",
        TechURL: "https://www.felixcloutier.com/x86/FXSAVE.html"
    },
    {
        Title: "FXTRACT",
        ToolTip: "Extract Exponent and Significand",
        TechURL: "https://www.felixcloutier.com/x86/FXTRACT.html"
    },
    {
        Title: "FYL2X",
        ToolTip: "Compute y ∗ log2x",
        TechURL: "https://www.felixcloutier.com/x86/FYL2X.html"
    },
    {
        Title: "FYL2XP1",
        ToolTip: "Compute y ∗ log2(x +1)",
        TechURL: "https://www.felixcloutier.com/x86/FYL2XP1.html"
    },
    {
        Title: "GF2P8AFFINEINVQB",
        ToolTip: "Galois Field Affine Transformation Inverse",
        TechURL: "https://www.felixcloutier.com/x86/GF2P8AFFINEINVQB.html"
    },
    {
        Title: "GF2P8AFFINEQB",
        ToolTip: "Galois Field Affine Transformation",
        TechURL: "https://www.felixcloutier.com/x86/GF2P8AFFINEQB.html"
    },
    {
        Title: "GF2P8MULB",
        ToolTip: "Galois Field Multiply Bytes",
        TechURL: "https://www.felixcloutier.com/x86/GF2P8MULB.html"
    },
    {
        Title: "HADDPD",
        ToolTip: "Packed Double-FP Horizontal Add",
        TechURL: "https://www.felixcloutier.com/x86/HADDPD.html"
    },
    {
        Title: "HADDPS",
        ToolTip: "Packed Single-FP Horizontal Add",
        TechURL: "https://www.felixcloutier.com/x86/HADDPS.html"
    },
    {
        Title: "HSUBPD",
        ToolTip: "Packed Double-FP Horizontal Subtract",
        TechURL: "https://www.felixcloutier.com/x86/HADDPD.html"
    },
    {
        Title: "HSUBPS",
        ToolTip: "Packed Single-FP Horizontal Subtract",
        TechURL: "https://www.felixcloutier.com/x86/HSUBPS.html"
    },
    {
        Title: "IN",
        ToolTip: "Input from Port",
        TechURL: "https://www.felixcloutier.com/x86/IN.html"
    },
    {
        Title: "INSERTPS",
        ToolTip: "Insert Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/INSERTPS.html"
    },
    {
        Title: "INT3",
        ToolTip: "Call to Interrupt Procedure",
        TechURL: "https://www.felixcloutier.com/x86/INTn:INTO:INT3:INT1.html"
    },
    {
        Title: "INVPCID",
        ToolTip: "Invalidate Process-Context Identifier",
        TechURL: "https://www.felixcloutier.com/x86/INVPCID.html"
    },
    {
        Title: "IRET",
        ToolTip: "Interrupt Return",
        TechURL: "https://www.felixcloutier.com/x86/IRET:IRETD.html"
    },
    {
        Title: "IRETD",
        ToolTip: "Interrupt Return",
        TechURL: "https://www.felixcloutier.com/x86/IRET:IRETD.html"
    },
    {
        Title: "KADDB",
        ToolTip: "ADD Two Masks",
        TechURL: "https://www.felixcloutier.com/x86/KADDW:KADDB:KADDQ:KADDD.html"
    },
    {
        Title: "KADDD",
        ToolTip: "ADD Two Masks",
        TechURL: "https://www.felixcloutier.com/x86/KADDW:KADDB:KADDQ:KADDD.html"
    },
    {
        Title: "KADDQ",
        ToolTip: "ADD Two Masks",
        TechURL: "https://www.felixcloutier.com/x86/KADDW:KADDB:KADDQ:KADDD.html"
    },
    {
        Title: "KADDW",
        ToolTip: "ADD Two Masks",
        TechURL: "https://www.felixcloutier.com/x86/KADDW:KADDB:KADDQ:KADDD.html"
    },
    {
        Title: "KANDB",
        ToolTip: "Bitwise Logical AND Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDW:KANDB:KANDQ:KANDD.html"
    },
    {
        Title: "KANDD",
        ToolTip: "Bitwise Logical AND Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDW:KANDB:KANDQ:KANDD.html"
    },
    {
        Title: "KANDNB",
        ToolTip: "Bitwise Logical AND NOT Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDNW:KANDNB:KANDNQ:KANDND.html"
    },
    {
        Title: "KANDND",
        ToolTip: "Bitwise Logical AND NOT Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDNW:KANDNB:KANDNQ:KANDND.html"
    },
    {
        Title: "KANDNQ",
        ToolTip: "Bitwise Logical AND NOT Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDNW:KANDNB:KANDNQ:KANDND.html"
    },
    {
        Title: "KANDNW",
        ToolTip: "Bitwise Logical AND NOT Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDNW:KANDNB:KANDNQ:KANDND.html"
    },
    {
        Title: "KANDQ",
        ToolTip: "Bitwise Logical AND Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDW:KANDB:KANDQ:KANDD.html"
    },
    {
        Title: "KANDW",
        ToolTip: "Bitwise Logical AND Masks",
        TechURL: "https://www.felixcloutier.com/x86/KANDW:KANDB:KANDQ:KANDD.html"
    },
    {
        Title: "KMOVB",
        ToolTip: "Move from and to Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KMOVW:KMOVB:KMOVQ:KMOVD.html"
    },
    {
        Title: "KMOVD",
        ToolTip: "Move from and to Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KMOVW:KMOVB:KMOVQ:KMOVD.html"
    },
    {
        Title: "KMOVQ",
        ToolTip: "Move from and to Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KMOVW:KMOVB:KMOVQ:KMOVD.html"
    },
    {
        Title: "KMOVW",
        ToolTip: "Move from and to Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KMOVW:KMOVB:KMOVQ:KMOVD.html"
    },
    {
        Title: "KNOTB",
        ToolTip: "NOT Mask Register",
        TechURL: "https://www.felixcloutier.com/x86/KNOTW:KNOTB:KNOTQ:KNOTD.html"
    },
    {
        Title: "KNOTD",
        ToolTip: "NOT Mask Register",
        TechURL: "https://www.felixcloutier.com/x86/KNOTW:KNOTB:KNOTQ:KNOTD.html"
    },
    {
        Title: "KNOTQ",
        ToolTip: "NOT Mask Register",
        TechURL: "https://www.felixcloutier.com/x86/KNOTW:KNOTB:KNOTQ:KNOTD.html"
    },
    {
        Title: "KNOTW",
        ToolTip: "NOT Mask Register",
        TechURL: "https://www.felixcloutier.com/x86/KNOTW:KNOTB:KNOTQ:KNOTD.html"
    },
    {
        Title: "KORB",
        ToolTip: "Bitwise Logical OR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KORW:KORB:KORQ:KORD.html"
    },
    {
        Title: "KORD",
        ToolTip: "Bitwise Logical OR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KORW:KORB:KORQ:KORD.html"
    },
    {
        Title: "KORQ",
        ToolTip: "Bitwise Logical OR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KORW:KORB:KORQ:KORD.html"
    },
    {
        Title: "KORW",
        ToolTip: "Bitwise Logical OR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KORW:KORB:KORQ:KORD.html"
    },
    {
        Title: "KORTESTB",
        ToolTip: "OR Masks And Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KORTESTW:KORTESTB:KORTESTQ:KORTESTD.html"
    },
    {
        Title: "KORTESTD",
        ToolTip: "OR Masks And Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KORTESTW:KORTESTB:KORTESTQ:KORTESTD.html"
    },
    {
        Title: "KORTESTQ",
        ToolTip: "OR Masks And Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KORTESTW:KORTESTB:KORTESTQ:KORTESTD.html"
    },
    {
        Title: "KORTESTW",
        ToolTip: "OR Masks And Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KORTESTW:KORTESTB:KORTESTQ:KORTESTD.html"
    },
    {
        Title: "KORW",
        ToolTip: "Bitwise Logical OR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KORW:KORB:KORQ:KORD.html"
    },
    {
        Title: "KSHIFTLB",
        ToolTip: "Shift Left Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTLW:KSHIFTLB:KSHIFTLQ:KSHIFTLD.html"
    },
    {
        Title: "KSHIFTLD",
        ToolTip: "Shift Left Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTLW:KSHIFTLB:KSHIFTLQ:KSHIFTLD.html"
    },
    {
        Title: "KSHIFTLQ",
        ToolTip: "Shift Left Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTLW:KSHIFTLB:KSHIFTLQ:KSHIFTLD.html"
    },
    {
        Title: "KSHIFTLW",
        ToolTip: "Shift Left Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTLW:KSHIFTLB:KSHIFTLQ:KSHIFTLD.html"
    },
    {
        Title: "KSHIFTRB",
        ToolTip: "Shift Right Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTRW:KSHIFTRB:KSHIFTRQ:KSHIFTRD.html"
    },
    {
        Title: "KSHIFTRD",
        ToolTip: "Shift Right Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTRW:KSHIFTRB:KSHIFTRQ:KSHIFTRD.html"
    },
    {
        Title: "KSHIFTRQ",
        ToolTip: "Shift Right Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTRW:KSHIFTRB:KSHIFTRQ:KSHIFTRD.html"
    },
    {
        Title: "KSHIFTRW",
        ToolTip: "Shift Right Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KSHIFTRW:KSHIFTRB:KSHIFTRQ:KSHIFTRD.html"
    },
    {
        Title: "KTESTB",
        ToolTip: "Packed Bit Test Masks and Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KTESTW:KTESTB:KTESTQ:KTESTD.html"
    },
    {
        Title: "KTESTD",
        ToolTip: "Packed Bit Test Masks and Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KTESTW:KTESTB:KTESTQ:KTESTD.html"
    },
    {
        Title: "KTESTQ",
        ToolTip: "Packed Bit Test Masks and Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KTESTW:KTESTB:KTESTQ:KTESTD.html"
    },
    {
        Title: "KTESTW",
        ToolTip: "Packed Bit Test Masks and Set Flags",
        TechURL: "https://www.felixcloutier.com/x86/KTESTW:KTESTB:KTESTQ:KTESTD.html"
    },
    {
        Title: "KUNPCKBW",
        ToolTip: "Unpack for Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KUNPCKBW:KUNPCKWD:KUNPCKDQ.html"
    },
    {
        Title: "KUNPCKDQ",
        ToolTip: "Unpack for Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KUNPCKBW:KUNPCKWD:KUNPCKDQ.html"
    },
    {
        Title: "KUNPCKWD",
        ToolTip: "Unpack for Mask Registers",
        TechURL: "https://www.felixcloutier.com/x86/KUNPCKBW:KUNPCKWD:KUNPCKDQ.html"
    },
    {
        Title: "KXNORB",
        ToolTip: "Bitwise Logical XNOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXNORW:KXNORB:KXNORQ:KXNORD.html"
    },
    {
        Title: "KXNORD",
        ToolTip: "Bitwise Logical XNOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXNORW:KXNORB:KXNORQ:KXNORD.html"
    },
    {
        Title: "KXNORQ",
        ToolTip: "Bitwise Logical XNOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXNORW:KXNORB:KXNORQ:KXNORD.html"
    },
    {
        Title: "KXNORW",
        ToolTip: "Bitwise Logical XNOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXNORW:KXNORB:KXNORQ:KXNORD.html"
    },
    {
        Title: "KXORB",
        ToolTip: "Bitwise Logical XOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXORW:KXORB:KXORQ:KXORD.html"
    },
    {
        Title: "KXORD",
        ToolTip: "Bitwise Logical XOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXORW:KXORB:KXORQ:KXORD.html"
    },
    {
        Title: "KXORQ",
        ToolTip: "Bitwise Logical XOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXORW:KXORB:KXORQ:KXORD.html"
    },
    {
        Title: "KXORW",
        ToolTip: "Bitwise Logical XOR Masks",
        TechURL: "https://www.felixcloutier.com/x86/KXORW:KXORB:KXORQ:KXORD.html"
    },
    {
        Title: "LDDQU",
        ToolTip: "Load Unaligned Integer 128 Bits",
        TechURL: "https://www.felixcloutier.com/x86/LDDQU.html"
    },
    {
        Title: "LDMXCSR",
        ToolTip: "Load MXCSR Register",
        TechURL: "https://www.felixcloutier.com/x86/LDMXCSR.html"
    },
    {
        Title: "LZCNT",
        ToolTip: "Count the Number of Leading Zero Bits",
        TechURL: "https://www.felixcloutier.com/x86/LZCNT.html"
    },
    {
        Title: "MASKMOVDQU",
        ToolTip: "Store Selected Bytes of Double Quadword",
        TechURL: "https://www.felixcloutier.com/x86/MASKMOVDQU.html"
    },
    {
        Title: "MASKMOVQ",
        ToolTip: "Store Selected Bytes of Quadword",
        TechURL: "https://www.felixcloutier.com/x86/MASKMOVQ.html"
    },
    {
        Title: "MAXPD",
        ToolTip: "Maximum of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MAXPD.html"
    },
    {
        Title: "MAXPS",
        ToolTip: "Maximum of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MAXPS.html"
    },
    {
        Title: "MAXSD",
        ToolTip: "Return Maximum Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MAXSD.html"
    },
    {
        Title: "MAXSS",
        ToolTip: "Return Maximum Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MAXSS.html"
    },
    {
        Title: "MFENCE",
        ToolTip: "Memory Fence",
        TechURL: "https://www.felixcloutier.com/x86/MFENCE.html"
    },
    {
        Title: "MINPD",
        ToolTip: "Minimum of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MINPD.html"
    },
    {
        Title: "MINPS",
        ToolTip: "Minimum of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MINPS.html"
    },
    {
        Title: "MINSD",
        ToolTip: "Return Minimum Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MINSD.html"
    },
    {
        Title: "MINSS",
        ToolTip: "Return Minimum Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MINSS.html"
    },
    {
        Title: "MONITOR",
        ToolTip: "Set Up Monitor Address",
        TechURL: "https://www.felixcloutier.com/x86/MONITOR.html"
    },
    {
        Title: "MOVAPD",
        ToolTip: "Move Aligned Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVAPD.html"
    },
    {
        Title: "MOVAPS",
        ToolTip: "Move Aligned Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVAPS.html"
    },
    {
        Title: "MOVBE",
        ToolTip: "Move Data After Swapping Bytes",
        TechURL: "https://www.felixcloutier.com/x86/MOVBE.html"
    },
    {
        Title: "MOVD",
        ToolTip: "Move Doubleword/Move Quadword",
        TechURL: "https://www.felixcloutier.com/x86/MOVD:MOVQ.html"
    },
    {
        Title: "MOVDDUP",
        ToolTip: "Replicate Double FP Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDDUP.html"
    },
    {
        Title: "MOVDIR64B",
        ToolTip: "Move 64 Bytes as Direct Store",
        TechURL: "https://www.felixcloutier.com/x86/MOVDIR64B.html"
    },
    {
        Title: "MOVDIRI",
        ToolTip: "Move Doubleword as Direct Store",
        TechURL: "https://www.felixcloutier.com/x86/MOVDIRI.html"
    },
    {
        Title: "MOVDQ2Q",
        ToolTip: "Move Quadword from XMM to MMX Technology Register",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQ2Q.html"
    },
    {
        Title: "MOVDQA",
        ToolTip: "Move Aligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQA:VMOVDQA32:VMOVDQA64.html"
    },
    {
        Title: "MOVDQU",
        ToolTip: "Move Unaligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQU:VMOVDQU8:VMOVDQU16:VMOVDQU32:VMOVDQU64.html"
    },
    {
        Title: "MOVHLPS",
        ToolTip: "Move Packed Single-Precision Floating-Point Values High to Low",
        TechURL: "https://www.felixcloutier.com/x86/MOVHLPS.html"
    },
    {
        Title: "MOVHPD",
        ToolTip: "Move High Packed Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MOVHPD.html"
    },
    {
        Title: "MOVHPS",
        ToolTip: "Move High Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVHPS.html"
    },
    {
        Title: "MOVLHPS",
        ToolTip: "Move Packed Single-Precision Floating-Point Values Low to High",
        TechURL: "https://www.felixcloutier.com/x86/MOVLHPS.html"
    },
    {
        Title: "MOVLPD",
        ToolTip: "Move Low Packed Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MOVLPD.html"
    },
    {
        Title: "MOVLPS",
        ToolTip: "Move Low Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVLPS.html"
    },
    {
        Title: "MOVMSKPD",
        ToolTip: "Extract Packed Double-Precision Floating-Point Sign Mask",
        TechURL: "https://www.felixcloutier.com/x86/MOVMSKPD.html"
    },
    {
        Title: "MOVMSKPS",
        ToolTip: "Extract Packed Single-Precision Floating-Point Sign Mask",
        TechURL: "https://www.felixcloutier.com/x86/MOVMSKPS.html"
    },
    {
        Title: "MOVNTDQ",
        ToolTip: "Store Packed Integers Using Non-Temporal Hint",
        TechURL: "https://www.felixcloutier.com/x86/MOVNTDQ.html"
    },
    {
        Title: "MOVNTDQA",
        ToolTip: "Load Double Quadword Non-Temporal Aligned Hint",
        TechURL: "https://www.felixcloutier.com/x86/MOVNTDQA.html"
    },
    {
        Title: "MOVNTI",
        ToolTip: "Store Doubleword Using Non-Temporal Hint",
        TechURL: "https://www.felixcloutier.com/x86/MOVNTI.html"
    },
    {
        Title: "MOVNTPD",
        ToolTip: "Store Packed Double-Precision Floating-Point Values Using Non-Temporal Hint",
        TechURL: "https://www.felixcloutier.com/x86/MOVNTPD.html"
    },
    {
        Title: "MOVNTPS",
        ToolTip: "Store Packed Single-Precision Floating-Point Values Using Non-Temporal Hint",
        TechURL: "https://www.felixcloutier.com/x86/MOVNTPS.html"
    },
    {
        Title: "MOVNTQ",
        ToolTip: "Store of Quadword Using Non-Temporal Hint",
        TechURL: "https://www.felixcloutier.com/x86/MOVNTQ.html"
    },
    {
        Title: "MOVQ",
        ToolTip: "Move Doubleword/Move Quadword",
        TechURL: "https://www.felixcloutier.com/x86/MOVD:MOVQ.html"
    },
    {
        Title: "MOVQ (1)",
        ToolTip: "Move Quadword",
        TechURL: "https://www.felixcloutier.com/x86/MOVQ.html"
    },
    {
        Title: "MOVQ2DQ",
        ToolTip: "Move Quadword from MMX Technology to XMM Register",
        TechURL: "https://www.felixcloutier.com/x86/MOVQ2DQ.html"
    },
    {
        Title: "MOVSHDUP",
        ToolTip: "Replicate Single FP Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVSHDUP.html"
    },
    {
        Title: "MOVSLDUP",
        ToolTip: "Replicate Single FP Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVSLDUP.html"
    },
    {
        Title: "MOVSS",
        ToolTip: "Move or Merge Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MOVSS.html"
    },
    {
        Title: "MOVSX",
        ToolTip: "Move with Sign-Extension",
        TechURL: "https://www.felixcloutier.com/x86/MOVSX:MOVSXD.html"
    },
    {
        Title: "MOVSXD",
        ToolTip: "Move with Sign-Extension",
        TechURL: "https://www.felixcloutier.com/x86/MOVSX:MOVSXD.html"
    },
    {
        Title: "MOVUPD",
        ToolTip: "Move Unaligned Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVUPD.html"
    },
    {
        Title: "MOVUPS",
        ToolTip: "Move Unaligned Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVUPS.html"
    },
    {
        Title: "MOVZX",
        ToolTip: "Move with Zero-Extend",
        TechURL: "https://www.felixcloutier.com/x86/MOVZX.html"
    },
    {
        Title: "MPSADBW",
        ToolTip: "Compute Multiple Packed Sums of Absolute Difference",
        TechURL: "https://www.felixcloutier.com/x86/MPSADBW.html"
    },
    {
        Title: "MULPD",
        ToolTip: "Multiply Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MULPD.html"
    },
    {
        Title: "MULPS",
        ToolTip: "Multiply Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MULPS.html"
    },
    {
        Title: "MULSD",
        ToolTip: "Multiply Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/MULSD.html"
    },
    {
        Title: "MULSS",
        ToolTip: "Multiply Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/MULSS.html"
    },
    {
        Title: "MULX",
        ToolTip: "Unsigned Multiply Without Affecting Flags",
        TechURL: "https://www.felixcloutier.com/x86/MULX.html"
    },
    {
        Title: "MWAIT",
        ToolTip: "Monitor Wait",
        TechURL: "https://www.felixcloutier.com/x86/MWAIT.html"
    },
    {
        Title: "ORPD",
        ToolTip: "Bitwise Logical OR of Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ORPD.html"
    },
    {
        Title: "ORPS",
        ToolTip: "Bitwise Logical OR of Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ORPS.html"
    },
    {
        Title: "OUT",
        ToolTip: "Output to Port",
        TechURL: "https://www.felixcloutier.com/x86/OUT.html"
    },
    {
        Title: "PABSB",
        ToolTip: "Packed Absolute Value",
        TechURL: "https://www.felixcloutier.com/x86/PABSB:PABSW:PABSD:PABSQ.html"
    },
    {
        Title: "PABSD",
        ToolTip: "Packed Absolute Value",
        TechURL: "https://www.felixcloutier.com/x86/PABSB:PABSW:PABSD:PABSQ.html"
    },
    {
        Title: "PABSQ",
        ToolTip: "Packed Absolute Value",
        TechURL: "https://www.felixcloutier.com/x86/PABSB:PABSW:PABSD:PABSQ.html"
    },
    {
        Title: "PABSW",
        ToolTip: "Packed Absolute Value",
        TechURL: "https://www.felixcloutier.com/x86/PABSB:PABSW:PABSD:PABSQ.html"
    },
    {
        Title: "PACKSSDW",
        ToolTip: "Pack with Signed Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PACKSSWB:PACKSSDW.html"
    },
    {
        Title: "PACKSSWB",
        ToolTip: "Pack with Signed Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PACKSSWB:PACKSSDW.html"
    },
    {
        Title: "PACKUSDW",
        ToolTip: "Pack with Unsigned Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PACKSSWB:PACKSSDW.html"
    },
    {
        Title: "PACKUSWB",
        ToolTip: "Pack with Unsigned Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PACKSSWB:PACKSSDW.html"
    },
    {
        Title: "PADDB",
        ToolTip: "Add Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PADDB:PADDW:PADDD:PADDQ.html"
    },
    {
        Title: "PADDD",
        ToolTip: "Add Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PADDB:PADDW:PADDD:PADDQ.html"
    },
    {
        Title: "PADDQ",
        ToolTip: "Add Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PADDB:PADDW:PADDD:PADDQ.html"
    },
    {
        Title: "PADDW",
        ToolTip: "Add Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PADDB:PADDW:PADDD:PADDQ.html"
    },
    {
        Title: "PADDSB",
        ToolTip: "Add Packed Signed Integers with Signed Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PADDSB:PADDSW.html"
    },
    {
        Title: "PADDSW",
        ToolTip: "Add Packed Signed Integers with Signed Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PADDSB:PADDSW.html"
    },
    {
        Title: "PADDUSB",
        ToolTip: "Add Packed Unsigned Integers with Unsigned Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PADDUSB:PADDUSW.html"
    },
    {
        Title: "PADDUSW",
        ToolTip: "Add Packed Unsigned Integers with Unsigned Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PADDUSB:PADDUSW.html"
    },
    {
        Title: "PALIGNR",
        ToolTip: "Packed Align Right",
        TechURL: "https://www.felixcloutier.com/x86/PALIGNR.html"
    },
    {
        Title: "PAND",
        ToolTip: "Logical AND",
        TechURL: "https://www.felixcloutier.com/x86/PAND.html"
    },
    {
        Title: "PANDN",
        ToolTip: "Logical AND NOT",
        TechURL: "https://www.felixcloutier.com/x86/PANDN.html"
    },
    {
        Title: "PAUSE",
        ToolTip: "Spin Loop Hint",
        TechURL: "https://www.felixcloutier.com/x86/PAUSE.html"
    },
    {
        Title: "PAVGB",
        ToolTip: "Average Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PAVGB:PAVGW.html"
    },
    {
        Title: "PAVGW",
        ToolTip: "Average Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PAVGB:PAVGW.html"
    },
    {
        Title: "PBLENDVB",
        ToolTip: "Variable Blend Packed Bytes",
        TechURL: "https://www.felixcloutier.com/x86/PBLENDVB.html"
    },
    {
        Title: "PBLENDW",
        ToolTip: "Blend Packed Words",
        TechURL: "https://www.felixcloutier.com/x86/PBLENDW.html"
    },
    {
        Title: "PCLMULQDQ",
        ToolTip: "Carry-Less Multiplication Quadword",
        TechURL: "https://www.felixcloutier.com/x86/PCLMULQDQ.html"
    },
    {
        Title: "PCMPEQB",
        ToolTip: "Compare Packed Data for Equal",
        TechURL: "https://www.felixcloutier.com/x86/PCMPEQB:PCMPEQW:PCMPEQD.html"
    },
    {
        Title: "PCMPEQD",
        ToolTip: "Compare Packed Data for Equal",
        TechURL: "https://www.felixcloutier.com/x86/PCMPEQB:PCMPEQW:PCMPEQD.html"
    },
    {
        Title: "PCMPEQQ",
        ToolTip: "Compare Packed Qword Data for Equal",
        TechURL: "https://www.felixcloutier.com/x86/PCMPEQQ.html"
    },
    {
        Title: "PCMPEQW",
        ToolTip: "Compare Packed Data for Equal",
        TechURL: "https://www.felixcloutier.com/x86/PCMPEQB:PCMPEQW:PCMPEQD.html"
    },
    {
        Title: "PCMPESTRI",
        ToolTip: "Packed Compare Explicit Length Strings, Return Index",
        TechURL: "https://www.felixcloutier.com/x86/PCMPESTRI.html"
    },
    {
        Title: "PCMPESTRM",
        ToolTip: "Packed Compare Explicit Length Strings, Return Mask",
        TechURL: "https://www.felixcloutier.com/x86/PCMPESTRM.html"
    },
    {
        Title: "PCMPGTB",
        ToolTip: "Compare Packed Signed Integers for Greater Than",
        TechURL: "https://www.felixcloutier.com/x86/PCMPGTB:PCMPGTW:PCMPGTD.html"
    },
    {
        Title: "PCMPGTD",
        ToolTip: "Compare Packed Signed Integers for Greater Than",
        TechURL: "https://www.felixcloutier.com/x86/PCMPGTB:PCMPGTW:PCMPGTD.html"
    },
    {
        Title: "PCMPGTQ",
        ToolTip: "Compare Packed Data for Greater Than",
        TechURL: "https://www.felixcloutier.com/x86/PCMPGTQ.html"
    },
    {
        Title: "PCMPGTW",
        ToolTip: "Compare Packed Signed Integers for Greater Than",
        TechURL: "https://www.felixcloutier.com/x86/PCMPGTB:PCMPGTW:PCMPGTD.html"
    },
    {
        Title: "PCMPISTRI",
        ToolTip: "Packed Compare Implicit Length Strings, Return Index",
        TechURL: "https://www.felixcloutier.com/x86/PCMPISTRI.html"
    },
    {
        Title: "PCMPISTRM",
        ToolTip: "Packed Compare Implicit Length Strings, Return Mask",
        TechURL: "https://www.felixcloutier.com/x86/PCMPISTRM.html"
    },
    {
        Title: "PDEP",
        ToolTip: "Parallel Bits Deposit",
        TechURL: "https://www.felixcloutier.com/x86/PDEP.html"
    },
    {
        Title: "PEXT",
        ToolTip: "Parallel Bits Extract",
        TechURL: "https://www.felixcloutier.com/x86/PEXT.html"
    },
    {
        Title: "PEXTRB",
        ToolTip: "Extract Byte/Dword/Qword",
        TechURL: "https://www.felixcloutier.com/x86/PEXTRB:PEXTRD:PEXTRQ.html"
    },
    {
        Title: "PEXTRD",
        ToolTip: "Extract Byte/Dword/Qword",
        TechURL: "https://www.felixcloutier.com/x86/PEXTRB:PEXTRD:PEXTRQ.html"
    },
    {
        Title: "PEXTRQ",
        ToolTip: "Extract Byte/Dword/Qword",
        TechURL: "https://www.felixcloutier.com/x86/PEXTRB:PEXTRD:PEXTRQ.html"
    },
    {
        Title: "PEXTRW",
        ToolTip: "Extract Word",
        TechURL: "https://www.felixcloutier.com/x86/PEXTRW.html"
    },
    {
        Title: "PHADDD",
        ToolTip: "Packed Horizontal Add",
        TechURL: "https://www.felixcloutier.com/x86/PHADDW:PHADDD.html"
    },
    {
        Title: "PHADDSW",
        ToolTip: "Packed Horizontal Add and Saturate",
        TechURL: "https://www.felixcloutier.com/x86/PHADDSW.html"
    },
    {
        Title: "PHADDW",
        ToolTip: "Packed Horizontal Add",
        TechURL: "https://www.felixcloutier.com/x86/PHADDW:PHADDD.html"
    },
    {
        Title: "PHMINPOSUW",
        ToolTip: "Packed Horizontal Word Minimum",
        TechURL: "https://www.felixcloutier.com/x86/PHMINPOSUW.html"
    },
    {
        Title: "PHSUBD",
        ToolTip: "Packed Horizontal Subtract",
        TechURL: "https://www.felixcloutier.com/x86/PHSUBW:PHSUBD.html"
    },
    {
        Title: "PHSUBSW",
        ToolTip: "Packed Horizontal Subtract and Saturate",
        TechURL: "https://www.felixcloutier.com/x86/PHSUBW:PHSUBD.html"
    },
    {
        Title: "PHSUBW",
        ToolTip: "Packed Horizontal Subtract",
        TechURL: "https://www.felixcloutier.com/x86/PHSUBW:PHSUBD.html"
    },
    {
        Title: "PINSRB",
        ToolTip: "Insert Byte/Dword/Qword",
        TechURL: "https://www.felixcloutier.com/x86/PINSRB:PINSRD:PINSRQ.html"
    },
    {
        Title: "PINSRD",
        ToolTip: "Insert Byte/Dword/Qword",
        TechURL: "https://www.felixcloutier.com/x86/PINSRB:PINSRD:PINSRQ.html"
    },
    {
        Title: "PINSRQ",
        ToolTip: "Insert Byte/Dword/Qword",
        TechURL: "https://www.felixcloutier.com/x86/PINSRB:PINSRD:PINSRQ.html"
    },
    {
        Title: "PINSRW",
        ToolTip: "Insert Word",
        TechURL: "https://www.felixcloutier.com/x86/PINSRW.html"
    },
    {
        Title: "PMADDUBSW",
        ToolTip: "Multiply and Add Packed Signed and Unsigned Bytes",
        TechURL: "https://www.felixcloutier.com/x86/PMADDUBSW.html"
    },
    {
        Title: "PMADDWD",
        ToolTip: "Multiply and Add Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMADDWD.html"
    },
    {
        Title: "PMAXSB",
        ToolTip: "Maximum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXSB:PMAXSW:PMAXSD:PMAXSQ.html"
    },
    {
        Title: "PMAXSD",
        ToolTip: "Maximum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXSB:PMAXSW:PMAXSD:PMAXSQ.html"
    },
    {
        Title: "PMAXSQ",
        ToolTip: "Maximum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXSB:PMAXSW:PMAXSD:PMAXSQ.html"
    },
    {
        Title: "PMAXSW",
        ToolTip: "Maximum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXSB:PMAXSW:PMAXSD:PMAXSQ.html"
    },
    {
        Title: "PMAXUB",
        ToolTip: "Maximum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXUB:PMAXUW.html"
    },
    {
        Title: "PMAXUD",
        ToolTip: "Maximum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXUD:PMAXUQ.html"
    },
    {
        Title: "PMAXUQ",
        ToolTip: "Maximum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXUD:PMAXUQ.html"
    },
    {
        Title: "PMAXUW",
        ToolTip: "Maximum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMAXUB:PMAXUW.html"
    },
    {
        Title: "PMINSB",
        ToolTip: "Minimum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINSB:PMINSW.html"
    },
    {
        Title: "PMINSD",
        ToolTip: "Minimum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINSD:PMINSQ.html"
    },
    {
        Title: "PMINSQ",
        ToolTip: "Minimum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINSD:PMINSQ.html"
    },
    {
        Title: "PMINSW",
        ToolTip: "Minimum of Packed Signed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINSB:PMINSW.html"
    },
    {
        Title: "PMINUB",
        ToolTip: "Minimum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINUB:PMINUW.html"
    },
    {
        Title: "PMINUD",
        ToolTip: "Minimum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINUD:PMINUQ.html"
    },
    {
        Title: "PMINUQ",
        ToolTip: "Minimum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINUD:PMINUQ.html"
    },
    {
        Title: "PMINUW",
        ToolTip: "Minimum of Packed Unsigned Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMINUB:PMINUW.html"
    },
    {
        Title: "PMOVMSKB",
        ToolTip: "Move Byte Mask",
        TechURL: "https://www.felixcloutier.com/x86/PMOVMSKB.html"
    },
    {
        Title: "PMOVSX",
        ToolTip: "Packed Move with Sign Extend",
        TechURL: "https://www.felixcloutier.com/x86/PMOVSX.html"
    },
    {
        Title: "PMOVZX",
        ToolTip: "Packed Move with Zero Extend",
        TechURL: "https://www.felixcloutier.com/x86/PMOVZX.html"
    },
    {
        Title: "PMULDQ",
        ToolTip: "Multiply Packed Doubleword Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMULDQ.html"
    },
    {
        Title: "PMULHRSW",
        ToolTip: "Packed Multiply High with Round and Scale",
        TechURL: "https://www.felixcloutier.com/x86/PMULHRSW.html"
    },
    {
        Title: "PMULHUW",
        ToolTip: "Multiply Packed Unsigned Integers and Store High Result",
        TechURL: "https://www.felixcloutier.com/x86/PMULHUW.html"
    },
    {
        Title: "PMULHW",
        ToolTip: "Multiply Packed Signed Integers and Store High Result",
        TechURL: "https://www.felixcloutier.com/x86/PMULHW.html"
    },
    {
        Title: "PMULLD",
        ToolTip: "Multiply Packed Integers and Store Low Result",
        TechURL: "https://www.felixcloutier.com/x86/PMULLD:PMULLQ.html"
    },
    {
        Title: "PMULLQ",
        ToolTip: "Multiply Packed Integers and Store Low Result",
        TechURL: "https://www.felixcloutier.com/x86/PMULLD:PMULLQ.html"
    },
    {
        Title: "PMULLW",
        ToolTip: "Multiply Packed Signed Integers and Store Low Result",
        TechURL: "https://www.felixcloutier.com/x86/PMULLW.html"
    },
    {
        Title: "PMULUDQ",
        ToolTip: "Multiply Packed Unsigned Doubleword Integers",
        TechURL: "https://www.felixcloutier.com/x86/PMULUDQ.html"
    },
    {
        Title: "POPCNT",
        ToolTip: "Return the Count of Number of Bits Set to 1",
        TechURL: "https://www.felixcloutier.com/x86/POPCNT.html"
    },
    {
        Title: "POR",
        ToolTip: "Bitwise Logical OR",
        TechURL: "https://www.felixcloutier.com/x86/POR.html"
    },
    {
        Title: "PREFETCHW",
        ToolTip: "Prefetch Data into Caches in Anticipation of a Write",
        TechURL: "https://www.felixcloutier.com/x86/PREFETCHW.html"
    },
    {
        Title: "PREFETCHh",
        ToolTip: "Prefetch Data Into Caches",
        TechURL: "https://www.felixcloutier.com/x86/PREFETCHh.html"
    },
    {
        Title: "PSADBW",
        ToolTip: "Compute Sum of Absolute Differences",
        TechURL: "https://www.felixcloutier.com/x86/PSADBW.html"
    },
    {
        Title: "PSHUFB",
        ToolTip: "Packed Shuffle Bytes",
        TechURL: "https://www.felixcloutier.com/x86/PSHUFB.html"
    },
    {
        Title: "PSHUFD",
        ToolTip: "Shuffle Packed Doublewords",
        TechURL: "https://www.felixcloutier.com/x86/PSHUFD.html"
    },
    {
        Title: "PSHUFHW",
        ToolTip: "Shuffle Packed High Words",
        TechURL: "https://www.felixcloutier.com/x86/PSHUFHW.html"
    },
    {
        Title: "PSHUFLW",
        ToolTip: "Shuffle Packed Low Words",
        TechURL: "https://www.felixcloutier.com/x86/PSHUFLW.html"
    },
    {
        Title: "PSHUFW",
        ToolTip: "Shuffle Packed Words",
        TechURL: "https://www.felixcloutier.com/x86/PSHUFW.html"
    },
    {
        Title: "PSIGNB",
        ToolTip: "Packed SIGN",
        TechURL: "https://www.felixcloutier.com/x86/PSIGNB:PSIGNW:PSIGND.html"
    },
    {
        Title: "PSIGND",
        ToolTip: "Packed SIGN",
        TechURL: "https://www.felixcloutier.com/x86/PSIGNB:PSIGNW:PSIGND.html"
    },
    {
        Title: "PSIGNW",
        ToolTip: "Packed SIGN",
        TechURL: "https://www.felixcloutier.com/x86/PSIGNB:PSIGNW:PSIGND.html"
    },
    {
        Title: "PSLLD",
        ToolTip: "Shift Packed Data Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSLLW:PSLLD:PSLLQ.html"
    },
    {
        Title: "PSLLDQ",
        ToolTip: "Shift Double Quadword Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSLLW:PSLLD:PSLLQ.html"
    },
    {
        Title: "PSLLQ",
        ToolTip: "Shift Packed Data Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSLLW:PSLLD:PSLLQ.html"
    },
    {
        Title: "PSLLW",
        ToolTip: "Shift Packed Data Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSLLW:PSLLD:PSLLQ.html"
    },
    {
        Title: "PSRAD",
        ToolTip: "Shift Packed Data Right Arithmetic",
        TechURL: "https://www.felixcloutier.com/x86/PSRAW:PSRAD:PSRAQ.html"
    },
    {
        Title: "PSRAQ",
        ToolTip: "Shift Packed Data Right Arithmetic",
        TechURL: "https://www.felixcloutier.com/x86/PSRAW:PSRAD:PSRAQ.html"
    },
    {
        Title: "PSRAW",
        ToolTip: "Shift Packed Data Right Arithmetic",
        TechURL: "https://www.felixcloutier.com/x86/PSRAW:PSRAD:PSRAQ.html"
    },
    {
        Title: "PSRLD",
        ToolTip: "Shift Packed Data Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSRLW:PSRLD:PSRLQ.html"
    },
    {
        Title: "PSRLDQ",
        ToolTip: "Shift Double Quadword Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSRLDQ.html"
    },
    {
        Title: "PSRLQ",
        ToolTip: "Shift Packed Data Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSRLW:PSRLD:PSRLQ.html"
    },
    {
        Title: "PSRLW",
        ToolTip: "Shift Packed Data Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/PSRLW:PSRLD:PSRLQ.html"
    },
    {
        Title: "PSUBB",
        ToolTip: "Subtract Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PSUBB:PSUBW:PSUBD.html"
    },
    {
        Title: "PSUBD",
        ToolTip: "Subtract Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PSUBB:PSUBW:PSUBD.html"
    },
    {
        Title: "PSUBQ",
        ToolTip: "Subtract Packed Quadword Integers",
        TechURL: "https://www.felixcloutier.com/x86/PSUBQ.html"
    },
    {
        Title: "PSUBSB",
        ToolTip: "Subtract Packed Signed Integers with Signed Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PSUBSB:PSUBSW.html"
    },
    {
        Title: "PSUBSW",
        ToolTip: "Subtract Packed Signed Integers with Signed Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PSUBSB:PSUBSW.html"
    },
    {
        Title: "PSUBUSB",
        ToolTip: "Subtract Packed Unsigned Integers with Unsigned Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PSUBUSB:PSUBUSW.html"
    },
    {
        Title: "PSUBUSW",
        ToolTip: "Subtract Packed Unsigned Integers with Unsigned Saturation",
        TechURL: "https://www.felixcloutier.com/x86/PSUBUSB:PSUBUSW.html"
    },
    {
        Title: "PSUBW",
        ToolTip: "Subtract Packed Integers",
        TechURL: "https://www.felixcloutier.com/x86/PSUBB:PSUBW:PSUBD.html"
    },
    {
        Title: "PTEST",
        ToolTip: "Logical Compare",
        TechURL: "https://www.felixcloutier.com/x86/PTEST.html"
    },
    {
        Title: "PTWRITE",
        ToolTip: "Write Data to a Processor Trace Packet",
        TechURL: "https://www.felixcloutier.com/x86/PTWRITE.html"
    },
    {
        Title: "PUNPCKHBW",
        ToolTip: "Unpack High Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKHBW:PUNPCKHWD:PUNPCKHDQ:PUNPCKHQDQ.html"
    },
    {
        Title: "PUNPCKHDQ",
        ToolTip: "Unpack High Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKHBW:PUNPCKHWD:PUNPCKHDQ:PUNPCKHQDQ.html"
    },
    {
        Title: "PUNPCKHQDQ",
        ToolTip: "Unpack High Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKHBW:PUNPCKHWD:PUNPCKHDQ:PUNPCKHQDQ.html"
    },
    {
        Title: "PUNPCKHWD",
        ToolTip: "Unpack High Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKHBW:PUNPCKHWD:PUNPCKHDQ:PUNPCKHQDQ.html"
    },
    {
        Title: "PUNPCKLBW",
        ToolTip: "Unpack Low Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKLBW:PUNPCKLWD:PUNPCKLDQ:PUNPCKLQDQ.html"
    },
    {
        Title: "PUNPCKLDQ",
        ToolTip: "Unpack Low Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKLBW:PUNPCKLWD:PUNPCKLDQ:PUNPCKLQDQ.html"
    },
    {
        Title: "PUNPCKLQDQ",
        ToolTip: "Unpack Low Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKLBW:PUNPCKLWD:PUNPCKLDQ:PUNPCKLQDQ.html"
    },
    {
        Title: "PUNPCKLWD",
        ToolTip: "Unpack Low Data",
        TechURL: "https://www.felixcloutier.com/x86/PUNPCKLBW:PUNPCKLWD:PUNPCKLDQ:PUNPCKLQDQ.html"
    },
    {
        Title: "PXOR",
        ToolTip: "Logical Exclusive OR",
        TechURL: "https://www.felixcloutier.com/x86/PXOR.html"
    },
    {
        Title: "RCPPS",
        ToolTip: "Compute Reciprocals of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/RCPPS.html"
    },
    {
        Title: "RCPSS",
        ToolTip: "Compute Reciprocal of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/RCPSS.html"
    },
    {
        Title: "RDFSBASE",
        ToolTip: "Read FS/GS Segment Base",
        TechURL: "https://www.felixcloutier.com/x86/RDFSBASE:RDGSBASE.html"
    },
    {
        Title: "RDGSBASE",
        ToolTip: "Read FS/GS Segment Base",
        TechURL: "https://www.felixcloutier.com/x86/RDFSBASE:RDGSBASE.html"
    },
    {
        Title: "RDMSR",
        ToolTip: "Read from Model Specific Register",
        TechURL: "https://www.felixcloutier.com/x86/RDMSR.html"
    },
    {
        Title: "RDPID",
        ToolTip: "Read Processor ID",
        TechURL: "https://www.felixcloutier.com/x86/RDPID.html"
    },
    {
        Title: "RDPKRU",
        ToolTip: "Read Protection Key Rights for User Pages",
        TechURL: "https://www.felixcloutier.com/x86/RDPKRU.html"
    },
    {
        Title: "RDPMC",
        ToolTip: "Read Performance-Monitoring Counters",
        TechURL: "https://www.felixcloutier.com/x86/RDPMC.html"
    },
    {
        Title: "RDRAND",
        ToolTip: "Read Random Number",
        TechURL: "https://www.felixcloutier.com/x86/RDRAND.html"
    },
    {
        Title: "RDSEED",
        ToolTip: "Read Random SEED",
        TechURL: "https://www.felixcloutier.com/x86/RDSEED.html"
    },
    {
        Title: "RDTSC",
        ToolTip: "Read Time-Stamp Counter",
        TechURL: "https://www.felixcloutier.com/x86/RDTSC.html"
    },
    {
        Title: "RDTSCP",
        ToolTip: "Read Time-Stamp Counter and Processor ID",
        TechURL: "https://www.felixcloutier.com/x86/RDTSCP.html"
    },
    {
        Title: "RORX",
        ToolTip: "Rotate Right Logical Without Affecting Flags",
        TechURL: "https://www.felixcloutier.com/x86/RORX.html"
    },
    {
        Title: "ROUNDPD",
        ToolTip: "Round Packed Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ROUNDPD.html"
    },
    {
        Title: "ROUNDPS",
        ToolTip: "Round Packed Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ROUNDPS.html"
    },
    {
        Title: "ROUNDSD",
        ToolTip: "Round Scalar Double Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ROUNDSD.html"
    },
    {
        Title: "ROUNDSS",
        ToolTip: "Round Scalar Single Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/ROUNDSS.html"
    },
    {
        Title: "RSM",
        ToolTip: "Resume from System Management Mode",
        TechURL: "https://www.felixcloutier.com/x86/RSM.html"
    },
    {
        Title: "RSQRTPS",
        ToolTip: "Compute Reciprocals of Square Roots of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/RSQRTPS.html"
    },
    {
        Title: "RSQRTSS",
        ToolTip: "Compute Reciprocal of Square Root of Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/RSQRTSS.html"
    },
    {
        Title: "SARX",
        ToolTip: "Shift Without Affecting Flags",
        TechURL: "https://www.felixcloutier.com/x86/SARX:SHLX:SHRX.html"
    },
    {
        Title: "SFENCE",
        ToolTip: "Store Fence",
        TechURL: "https://www.felixcloutier.com/x86/SFENCE.html"
    },
    {
        Title: "SHA1MSG1",
        ToolTip: "Perform an Intermediate Calculation for the Next Four SHA1 Message Dwords",
        TechURL: "https://www.felixcloutier.com/x86/SHA1MSG1.html"
    },
    {
        Title: "SHA1MSG2",
        ToolTip: "Perform a Final Calculation for the Next Four SHA1 Message Dwords",
        TechURL: "https://www.felixcloutier.com/x86/SHA1MSG2.html"
    },
    {
        Title: "SHA1NEXTE",
        ToolTip: "Calculate SHA1 State Variable E after Four Rounds",
        TechURL: "https://www.felixcloutier.com/x86/SHA1NEXTE.html"
    },
    {
        Title: "SHA1RNDS4",
        ToolTip: "Perform Four Rounds of SHA1 Operation",
        TechURL: "https://www.felixcloutier.com/x86/SHA1RNDS4.html"
    },
    {
        Title: "SHA256MSG1",
        ToolTip: "Perform an Intermediate Calculation for the Next Four SHA256 Message Dwords",
        TechURL: "https://www.felixcloutier.com/x86/SHA256MSG1.html"
    },
    {
        Title: "SHA256MSG2",
        ToolTip: "Perform a Final Calculation for the Next Four SHA256 Message Dwords",
        TechURL: "https://www.felixcloutier.com/x86/SHA256MSG2.html"
    },
    {
        Title: "SHA256RNDS2",
        ToolTip: "Perform Two Rounds of SHA256 Operation",
        TechURL: "https://www.felixcloutier.com/x86/SHA256RNDS2.html"
    },
    {
        Title: "SHLD",
        ToolTip: "Double Precision Shift Left",
        TechURL: "https://www.felixcloutier.com/x86/SHLD.html"
    },
    {
        Title: "SHLX",
        ToolTip: "Shift Without Affecting Flags",
        TechURL: "https://www.felixcloutier.com/x86/SARX:SHLX:SHRX.html"
    },
    {
        Title: "SHRD",
        ToolTip: "Double Precision Shift Right",
        TechURL: "https://www.felixcloutier.com/x86/SHRD.html"
    },
    {
        Title: "SHRX",
        ToolTip: "Shift Without Affecting Flags",
        TechURL: "https://www.felixcloutier.com/x86/SARX:SHLX:SHRX.html"
    },
    {
        Title: "SHUFPD",
        ToolTip: "Packed Interleave Shuffle of Pairs of Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/SHUFPD.html"
    },
    {
        Title: "SHUFPS",
        ToolTip: "Packed Interleave Shuffle of Quadruplets of Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/SHUFPS.html"
    },
    {
        Title: "SQRTPD",
        ToolTip: "Square Root of Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/SQRTPD.html"
    },
    {
        Title: "SQRTPS",
        ToolTip: "Square Root of Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/SQRTPS.html"
    },
    {
        Title: "SQRTSD",
        ToolTip: "Compute Square Root of Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/SQRTSD.html"
    },
    {
        Title: "SQRTSS",
        ToolTip: "Compute Square Root of Scalar Single-Precision Value",
        TechURL: "https://www.felixcloutier.com/x86/SQRTSS.html"
    },
    {
        Title: "STMXCSR",
        ToolTip: "Store MXCSR Register State",
        TechURL: "https://www.felixcloutier.com/x86/STMXCSR.html"
    },
    {
        Title: "SUBPD",
        ToolTip: "Subtract Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/SUBPD.html"
    },
    {
        Title: "SUBPS",
        ToolTip: "Subtract Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/SUBPS.html"
    },
    {
        Title: "SUBSD",
        ToolTip: "Subtract Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/SUBSD.html"
    },
    {
        Title: "SUBSS",
        ToolTip: "Subtract Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/SUBSS.html"
    },
    {
        Title: "SWAPGS",
        ToolTip: "Swap GS Base Register",
        TechURL: "https://www.felixcloutier.com/x86/SWAPGS.html"
    },
    {
        Title: "SYSCALL",
        ToolTip: "Fast System Call",
        TechURL: "https://www.felixcloutier.com/x86/SYSCALL.html"
    },
    {
        Title: "SYSENTER",
        ToolTip: "Fast System Call",
        TechURL: "https://www.felixcloutier.com/x86/SYSENTER.html"
    },
    {
        Title: "SYSEXIT",
        ToolTip: "Fast Return from Fast System Call",
        TechURL: "https://www.felixcloutier.com/x86/SYSEXIT.html"
    },
    {
        Title: "SYSRET",
        ToolTip: "Return From Fast System Call",
        TechURL: "https://www.felixcloutier.com/x86/SYSRET.html"
    },
    {
        Title: "TPAUSE",
        ToolTip: "Timed PAUSE",
        TechURL: "https://www.felixcloutier.com/x86/TPAUSE.html"
    },
    {
        Title: "TZCNT",
        ToolTip: "Count the Number of Trailing Zero Bits",
        TechURL: "https://www.felixcloutier.com/x86/TZCNT.html"
    },
    {
        Title: "UCOMISD",
        ToolTip: "Unordered Compare Scalar Double-Precision Floating-Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/UCOMISD.html"
    },
    {
        Title: "UCOMISS",
        ToolTip: "Unordered Compare Scalar Single-Precision Floating-Point Values and Set EFLAGS",
        TechURL: "https://www.felixcloutier.com/x86/UCOMISS.html"
    },
    {
        Title: "UD",
        ToolTip: "Undefined Instruction",
        TechURL: "https://www.felixcloutier.com/x86/UD.html"
    },
    {
        Title: "UMONITOR",
        ToolTip: "User Level Set Up Monitor Address",
        TechURL: "https://www.felixcloutier.com/x86/UMONITOR.html"
    },
    {
        Title: "UMWAIT",
        ToolTip: "User Level Monitor Wait",
        TechURL: "https://www.felixcloutier.com/x86/UMWAIT.html"
    },
    {
        Title: "UNPCKHPD",
        ToolTip: "Unpack and Interleave High Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/UNPCKHPD.html"
    },
    {
        Title: "UNPCKHPS",
        ToolTip: "Unpack and Interleave High Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/UNPCKHPS.html"
    },
    {
        Title: "UNPCKLPD",
        ToolTip: "Unpack and Interleave Low Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/UNPCKLPD.html"
    },
    {
        Title: "UNPCKLPS",
        ToolTip: "Unpack and Interleave Low Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/UNPCKLPS.html"
    },
    {
        Title: "VALIGND",
        ToolTip: "Align Doubleword/Quadword Vectors",
        TechURL: "https://www.felixcloutier.com/x86/VALIGND:VALIGNQ.html"
    },
    {
        Title: "VALIGNQ",
        ToolTip: "Align Doubleword/Quadword Vectors",
        TechURL: "https://www.felixcloutier.com/x86/VALIGND:VALIGNQ.html"
    },
    {
        Title: "VBLENDMPD",
        ToolTip: "Blend Float64/Float32 Vectors Using an OpMask Control",
        TechURL: "https://www.felixcloutier.com/x86/VBLENDMPD:VBLENDMPS.html"
    },
    {
        Title: "VBLENDMPS",
        ToolTip: "Blend Float64/Float32 Vectors Using an OpMask Control",
        TechURL: "https://www.felixcloutier.com/x86/VBLENDMPD:VBLENDMPS.html"
    },
    {
        Title: "VBROADCAST",
        ToolTip: "Load with Broadcast Floating-Point Data",
        TechURL: "https://www.felixcloutier.com/x86/VBROADCAST.html"
    },
    {
        Title: "VCOMPRESSPD",
        ToolTip: "Store Sparse Packed Double-Precision Floating-Point Values into Dense Memory",
        TechURL: "https://www.felixcloutier.com/x86/VCOMPRESSPD.html"
    },
    {
        Title: "VCOMPRESSPS",
        ToolTip: "Store Sparse Packed Single-Precision Floating-Point Values into Dense Memory",
        TechURL: "https://www.felixcloutier.com/x86/VCOMPRESSPS.html"
    },
    {
        Title: "VCVTPD2QQ",
        ToolTip: "Convert Packed Double-Precision Floating-Point Values to Packed Quadword Integers",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPD2QQ.html"
    },
    {
        Title: "VCVTPD2UDQ",
        ToolTip: "Convert Packed Double-Precision Floating-Point Values to Packed Unsigned Doubleword Integers",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPD2UDQ.html"
    },
    {
        Title: "VCVTPD2UQQ",
        ToolTip: "Convert Packed Double-Precision Floating-Point Values to Packed Unsigned Quadword Integers",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPD2UQQ.html"
    },
    {
        Title: "VCVTPH2PS",
        ToolTip: "Convert 16-bit FP values to Single-Precision FP values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPH2PS.html"
    },
    {
        Title: "VCVTPS2PH",
        ToolTip: "Convert Single-Precision FP value to 16-bit FP value",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPS2PH.html"
    },
    {
        Title: "VCVTPS2QQ",
        ToolTip: "Convert Packed Single Precision Floating-Point Values to Packed Singed Quadword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPS2QQ.html"
    },
    {
        Title: "VCVTPS2UDQ",
        ToolTip: "Convert Packed Single-Precision Floating-Point Values to Packed Unsigned Doubleword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPS2UDQ.html"
    },
    {
        Title: "VCVTPS2UQQ",
        ToolTip: "Convert Packed Single Precision Floating-Point Values to Packed Unsigned Quadword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTPS2UQQ.html"
    },
    {
        Title: "VCVTQQ2PD",
        ToolTip: "Convert Packed Quadword Integers to Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTQQ2PD.html"
    },
    {
        Title: "VCVTQQ2PS",
        ToolTip: "Convert Packed Quadword Integers to Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTQQ2PS.html"
    },
    {
        Title: "VCVTSD2USI",
        ToolTip: "Convert Scalar Double-Precision Floating-Point Value to Unsigned Doubleword Integer",
        TechURL: "https://www.felixcloutier.com/x86/VCVTSD2USI.html"
    },
    {
        Title: "VCVTSS2USI",
        ToolTip: "Convert Scalar Single-Precision Floating-Point Value to Unsigned Doubleword Integer",
        TechURL: "https://www.felixcloutier.com/x86/VCVTSS2USI.html"
    },
    {
        Title: "VCVTTPD2QQ",
        ToolTip: "Convert with Truncation Packed Double-Precision Floating-Point Values to Packed Quadword Integers",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTPD2QQ.html"
    },
    {
        Title: "VCVTTPD2UDQ",
        ToolTip: "Convert with Truncation Packed Double-Precision Floating-Point Values to Packed Unsigned Doubleword Integers",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTPD2UDQ.html"
    },
    {
        Title: "VCVTTPD2UQQ",
        ToolTip: "Convert with Truncation Packed Double-Precision Floating-Point Values to Packed Unsigned Quadword Integers",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTPD2UQQ.html"
    },
    {
        Title: "VCVTTPS2QQ",
        ToolTip: "Convert with Truncation Packed Single Precision Floating-Point Values to Packed Singed Quadword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTPS2QQ.html"
    },
    {
        Title: "VCVTTPS2UDQ",
        ToolTip: "Convert with Truncation Packed Single-Precision Floating-Point Values to Packed Unsigned Doubleword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTPS2UDQ.html"
    },
    {
        Title: "VCVTTPS2UQQ",
        ToolTip: "Convert with Truncation Packed Single Precision Floating-Point Values to Packed Unsigned Quadword Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTPS2UQQ.html"
    },
    {
        Title: "VCVTTSD2USI",
        ToolTip: "Convert with Truncation Scalar Double-Precision Floating-Point Value to Unsigned Integer",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTSD2USI.html"
    },
    {
        Title: "VCVTTSS2USI",
        ToolTip: "Convert with Truncation Scalar Single-Precision Floating-Point Value to Unsigned Integer",
        TechURL: "https://www.felixcloutier.com/x86/VCVTTSS2USI.html"
    },
    {
        Title: "VCVTUDQ2PD",
        ToolTip: "Convert Packed Unsigned Doubleword Integers to Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTUDQ2PD.html"
    },
    {
        Title: "VCVTUDQ2PS",
        ToolTip: "Convert Packed Unsigned Doubleword Integers to Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTUDQ2PS.html"
    },
    {
        Title: "VCVTUQQ2PD",
        ToolTip: "Convert Packed Unsigned Quadword Integers to Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTUQQ2PD.html"
    },
    {
        Title: "VCVTUQQ2PS",
        ToolTip: "Convert Packed Unsigned Quadword Integers to Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VCVTUQQ2PS.html"
    },
    {
        Title: "VCVTUSI2SD",
        ToolTip: "Convert Unsigned Integer to Scalar Double-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/VCVTUSI2SD.html"
    },
    {
        Title: "VCVTUSI2SS",
        ToolTip: "Convert Unsigned Integer to Scalar Single-Precision Floating-Point Value",
        TechURL: "https://www.felixcloutier.com/x86/VCVTUSI2SS.html"
    },
    {
        Title: "VDBPSADBW",
        ToolTip: "Double Block Packed Sum-Absolute-Differences (SAD) on Unsigned Bytes",
        TechURL: "https://www.felixcloutier.com/x86/VDBPSADBW.html"
    },
    {
        Title: "VEXPANDPD",
        ToolTip: "Load Sparse Packed Double-Precision Floating-Point Values from Dense Memory",
        TechURL: "https://www.felixcloutier.com/x86/VEXPANDPD.html"
    },
    {
        Title: "VEXPANDPS",
        ToolTip: "Load Sparse Packed Single-Precision Floating-Point Values from Dense Memory",
        TechURL: "https://www.felixcloutier.com/x86/VEXPANDPS.html"
    },
    {
        Title: "VEXTRACTF128",
        ToolTip: "Extra ct Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTF128:VEXTRACTF32x4:VEXTRACTF64x2:VEXTRACTF32x8:VEXTRACTF64x4.html"
    },
    {
        Title: "VEXTRACTF32x4",
        ToolTip: "Extra ct Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTF128:VEXTRACTF32x4:VEXTRACTF64x2:VEXTRACTF32x8:VEXTRACTF64x4.html"
    },
    {
        Title: "VEXTRACTF32x8",
        ToolTip: "Extra ct Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTF128:VEXTRACTF32x4:VEXTRACTF64x2:VEXTRACTF32x8:VEXTRACTF64x4.html"
    },
    {
        Title: "VEXTRACTF64x2",
        ToolTip: "Extra ct Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTF128:VEXTRACTF32x4:VEXTRACTF64x2:VEXTRACTF32x8:VEXTRACTF64x4.html"
    },
    {
        Title: "VEXTRACTF64x4",
        ToolTip: "Extra ct Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTF128:VEXTRACTF32x4:VEXTRACTF64x2:VEXTRACTF32x8:VEXTRACTF64x4.html"
    },
    {
        Title: "VEXTRACTI128",
        ToolTip: "Extract packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTI128:VEXTRACTI32x4:VEXTRACTI64x2:VEXTRACTI32x8:VEXTRACTI64x4.html"
    },
    {
        Title: "VEXTRACTI32x4",
        ToolTip: "Extract packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTI128:VEXTRACTI32x4:VEXTRACTI64x2:VEXTRACTI32x8:VEXTRACTI64x4.html"
    },
    {
        Title: "VEXTRACTI32x8",
        ToolTip: "Extract packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTI128:VEXTRACTI32x4:VEXTRACTI64x2:VEXTRACTI32x8:VEXTRACTI64x4.html"
    },
    {
        Title: "VEXTRACTI64x2",
        ToolTip: "Extract packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTI128:VEXTRACTI32x4:VEXTRACTI64x2:VEXTRACTI32x8:VEXTRACTI64x4.html"
    },
    {
        Title: "VEXTRACTI64x4",
        ToolTip: "Extract packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VEXTRACTI128:VEXTRACTI32x4:VEXTRACTI64x2:VEXTRACTI32x8:VEXTRACTI64x4.html"
    },
    {
        Title: "VFIXUPIMMPD",
        ToolTip: "Fix Up Special Packed Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VFIXUPIMMPD.html"
    },
    {
        Title: "VFIXUPIMMPS",
        ToolTip: "Fix Up Special Packed Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VFIXUPIMMPS.html"
    },
    {
        Title: "VFIXUPIMMSD",
        ToolTip: "Fix Up Special Scalar Float64 Value",
        TechURL: "https://www.felixcloutier.com/x86/VFIXUPIMMSD.html"
    },
    {
        Title: "VFIXUPIMMSS",
        ToolTip: "Fix Up Special Scalar Float32 Value",
        TechURL: "https://www.felixcloutier.com/x86/VFIXUPIMMSS.html"
    },
    {
        Title: "VFMADD132PD",
        ToolTip: "Fused Multiply-Add of Packed Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132PD:VFMADD213PD:VFMADD231PD.html"
    },
    {
        Title: "VFMADD132PS",
        ToolTip: "Fused Multiply-Add of Packed Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132PS:VFMADD213PS:VFMADD231PS.html"
    },
    {
        Title: "VFMADD132SD",
        ToolTip: "Fused Multiply-Add of Scalar Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132SD:VFMADD213SD:VFMADD231SD.html"
    },
    {
        Title: "VFMADD132SS",
        ToolTip: "Fused Multiply-Add of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132SS:VFMADD213SS:VFMADD231SS.html"
    },
    {
        Title: "VFMADD213PD",
        ToolTip: "Fused Multiply-Add of Packed Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132PD:VFMADD213PD:VFMADD231PD.html"
    },
    {
        Title: "VFMADD213PS",
        ToolTip: "Fused Multiply-Add of Packed Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132PS:VFMADD213PS:VFMADD231PS.html"
    },
    {
        Title: "VFMADD213SD",
        ToolTip: "Fused Multiply-Add of Scalar Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132SD:VFMADD213SD:VFMADD231SD.html"
    },
    {
        Title: "VFMADD213SS",
        ToolTip: "Fused Multiply-Add of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132SS:VFMADD213SS:VFMADD231SS.html"
    },
    {
        Title: "VFMADD231PD",
        ToolTip: "Fused Multiply-Add of Packed Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132PD:VFMADD213PD:VFMADD231PD.html"
    },
    {
        Title: "VFMADD231PS",
        ToolTip: "Fused Multiply-Add of Packed Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132PS:VFMADD213PS:VFMADD231PS.html"
    },
    {
        Title: "VFMADD231SD",
        ToolTip: "Fused Multiply-Add of Scalar Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132SD:VFMADD213SD:VFMADD231SD.html"
    },
    {
        Title: "VFMADD231SS",
        ToolTip: "Fused Multiply-Add of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADD132SS:VFMADD213SS:VFMADD231SS.html"
    },
    {
        Title: "VFMADDSUB132PD",
        ToolTip: "Fused Multiply-Alternating Add/Subtract of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADDSUB132PD:VFMADDSUB213PD:VFMADDSUB231PD.html"
    },
    {
        Title: "VFMADDSUB132PS",
        ToolTip: "Fused Multiply-Alternating Add/Subtract of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADDSUB132PS:VFMADDSUB213PS:VFMADDSUB231PS.html"
    },
    {
        Title: "VFMADDSUB213PD",
        ToolTip: "Fused Multiply-Alternating Add/Subtract of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADDSUB132PD:VFMADDSUB213PD:VFMADDSUB231PD.html"
    },
    {
        Title: "VFMADDSUB213PS",
        ToolTip: "Fused Multiply-Alternating Add/Subtract of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADDSUB132PS:VFMADDSUB213PS:VFMADDSUB231PS.html"
    },
    {
        Title: "VFMADDSUB231PD",
        ToolTip: "Fused Multiply-Alternating Add/Subtract of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADDSUB132PD:VFMADDSUB213PD:VFMADDSUB231PD.html"
    },
    {
        Title: "VFMADDSUB231PS",
        ToolTip: "Fused Multiply-Alternating Add/Subtract of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMADDSUB132PS:VFMADDSUB213PS:VFMADDSUB231PS.html"
    },
    {
        Title: "VFMSUB132PD",
        ToolTip: "Fused Multiply-Subtract of Packed Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132PD:VFMSUB213PD:VFMSUB231PD.html"
    },
    {
        Title: "VFMSUB132PS",
        ToolTip: "Fused Multiply-Subtract of Packed Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132PS:VFMSUB213PS:VFMSUB231PS.html"
    },
    {
        Title: "VFMSUB132SD",
        ToolTip: "Fused Multiply-Subtract of Scalar Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132SD:VFMSUB213SD:VFMSUB231SD.html"
    },
    {
        Title: "VFMSUB132SS",
        ToolTip: "Fused Multiply-Subtract of Scalar Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132SS:VFMSUB213SS:VFMSUB231SS.html"
    },
    {
        Title: "VFMSUB213PD",
        ToolTip: "Fused Multiply-Subtract of Packed Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132PD:VFMSUB213PD:VFMSUB231PD.html"
    },
    {
        Title: "VFMSUB213PS",
        ToolTip: "Fused Multiply-Subtract of Packed Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132PS:VFMSUB213PS:VFMSUB231PS.html"
    },
    {
        Title: "VFMSUB213SD",
        ToolTip: "Fused Multiply-Subtract of Scalar Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132SD:VFMSUB213SD:VFMSUB231SD.html"
    },
    {
        Title: "VFMSUB213SS",
        ToolTip: "Fused Multiply-Subtract of Scalar Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132SS:VFMSUB213SS:VFMSUB231SS.html"
    },
    {
        Title: "VFMSUB231PD",
        ToolTip: "Fused Multiply-Subtract of Packed Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132PD:VFMSUB213PD:VFMSUB231PD.html"
    },
    {
        Title: "VFMSUB231PS",
        ToolTip: "Fused Multiply-Subtract of Packed Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132PS:VFMSUB213PS:VFMSUB231PS.html"
    },
    {
        Title: "VFMSUB231SD",
        ToolTip: "Fused Multiply-Subtract of Scalar Double- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132SD:VFMSUB213SD:VFMSUB231SD.html"
    },
    {
        Title: "VFMSUB231SS",
        ToolTip: "Fused Multiply-Subtract of Scalar Single- Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUB132SS:VFMSUB213SS:VFMSUB231SS.html"
    },
    {
        Title: "VFMSUBADD132PD",
        ToolTip: "Fused Multiply-Alternating Subtract/Add of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUBADD132PD:VFMSUBADD213PD:VFMSUBADD231PD.html"
    },
    {
        Title: "VFMSUBADD132PS",
        ToolTip: "Fused Multiply-Alternating Subtract/Add of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUBADD132PS:VFMSUBADD213PS:VFMSUBADD231PS.html"
    },
    {
        Title: "VFMSUBADD213PD",
        ToolTip: "Fused Multiply-Alternating Subtract/Add of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUBADD132PD:VFMSUBADD213PD:VFMSUBADD231PD.html"
    },
    {
        Title: "VFMSUBADD213PS",
        ToolTip: "Fused Multiply-Alternating Subtract/Add of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUBADD132PS:VFMSUBADD213PS:VFMSUBADD231PS.html"
    },
    {
        Title: "VFMSUBADD231PD",
        ToolTip: "Fused Multiply-Alternating Subtract/Add of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUBADD132PD:VFMSUBADD213PD:VFMSUBADD231PD.html"
    },
    {
        Title: "VFMSUBADD231PS",
        ToolTip: "Fused Multiply-Alternating Subtract/Add of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFMSUBADD132PS:VFMSUBADD213PS:VFMSUBADD231PS.html"
    },
    {
        Title: "VFNMADD132PD",
        ToolTip: "Fused Negative Multiply-Add of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132PD:VFNMADD213PD:VFNMADD231PD.html"
    },
    {
        Title: "VFNMADD132PS",
        ToolTip: "Fused Negative Multiply-Add of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132PS:VFNMADD213PS:VFNMADD231PS.html"
    },
    {
        Title: "VFNMADD132SD",
        ToolTip: "Fused Negative Multiply-Add of Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132SD:VFNMADD213SD:VFNMADD231SD.html"
    },
    {
        Title: "VFNMADD132SS",
        ToolTip: "Fused Negative Multiply-Add of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132SS:VFNMADD213SS:VFNMADD231SS.html"
    },
    {
        Title: "VFNMADD213PD",
        ToolTip: "Fused Negative Multiply-Add of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132PD:VFNMADD213PD:VFNMADD231PD.html"
    },
    {
        Title: "VFNMADD213PS",
        ToolTip: "Fused Negative Multiply-Add of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132PS:VFNMADD213PS:VFNMADD231PS.html"
    },
    {
        Title: "VFNMADD213SD",
        ToolTip: "Fused Negative Multiply-Add of Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132SD:VFNMADD213SD:VFNMADD231SD.html"
    },
    {
        Title: "VFNMADD213SS",
        ToolTip: "Fused Negative Multiply-Add of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132SS:VFNMADD213SS:VFNMADD231SS.html"
    },
    {
        Title: "VFNMADD231PD",
        ToolTip: "Fused Negative Multiply-Add of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132PD:VFNMADD213PD:VFNMADD231PD.html"
    },
    {
        Title: "VFNMADD231PS",
        ToolTip: "Fused Negative Multiply-Add of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132PS:VFNMADD213PS:VFNMADD231PS.html"
    },
    {
        Title: "VFNMADD231SD",
        ToolTip: "Fused Negative Multiply-Add of Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132SD:VFNMADD213SD:VFNMADD231SD.html"
    },
    {
        Title: "VFNMADD231SS",
        ToolTip: "Fused Negative Multiply-Add of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMADD132SS:VFNMADD213SS:VFNMADD231SS.html"
    },
    {
        Title: "VFNMSUB132PD",
        ToolTip: "Fused Negative Multiply-Subtract of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132PD:VFNMSUB213PD:VFNMSUB231PD.html"
    },
    {
        Title: "VFNMSUB132PS",
        ToolTip: "Fused Negative Multiply-Subtract of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132PS:VFNMSUB213PS:VFNMSUB231PS.html"
    },
    {
        Title: "VFNMSUB132SD",
        ToolTip: "Fused Negative Multiply-Subtract of Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132SD:VFNMSUB213SD:VFNMSUB231SD.html"
    },
    {
        Title: "VFNMSUB132SS",
        ToolTip: "Fused Negative Multiply-Subtract of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132SS:VFNMSUB213SS:VFNMSUB231SS.html"
    },
    {
        Title: "VFNMSUB213PD",
        ToolTip: "Fused Negative Multiply-Subtract of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132PD:VFNMSUB213PD:VFNMSUB231PD.html"
    },
    {
        Title: "VFNMSUB213PS",
        ToolTip: "Fused Negative Multiply-Subtract of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132PS:VFNMSUB213PS:VFNMSUB231PS.html"
    },
    {
        Title: "VFNMSUB213SD",
        ToolTip: "Fused Negative Multiply-Subtract of Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132SD:VFNMSUB213SD:VFNMSUB231SD.html"
    },
    {
        Title: "VFNMSUB213SS",
        ToolTip: "Fused Negative Multiply-Subtract of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132SS:VFNMSUB213SS:VFNMSUB231SS.html"
    },
    {
        Title: "VFNMSUB231PD",
        ToolTip: "Fused Negative Multiply-Subtract of Packed Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132PD:VFNMSUB213PD:VFNMSUB231PD.html"
    },
    {
        Title: "VFNMSUB231PS",
        ToolTip: "Fused Negative Multiply-Subtract of Packed Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132PS:VFNMSUB213PS:VFNMSUB231PS.html"
    },
    {
        Title: "VFNMSUB231SD",
        ToolTip: "Fused Negative Multiply-Subtract of Scalar Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132SD:VFNMSUB213SD:VFNMSUB231SD.html"
    },
    {
        Title: "VFNMSUB231SS",
        ToolTip: "Fused Negative Multiply-Subtract of Scalar Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VFNMSUB132SS:VFNMSUB213SS:VFNMSUB231SS.html"
    },
    {
        Title: "VFPCLASSPD",
        ToolTip: "Tests Types Of a Packed Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VFPCLASSPD.html"
    },
    {
        Title: "VFPCLASSPS",
        ToolTip: "Tests Types Of a Packed Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VFPCLASSPS.html"
    },
    {
        Title: "VFPCLASSSD",
        ToolTip: "Tests Types Of a Scalar Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VFPCLASSSD.html"
    },
    {
        Title: "VFPCLASSSS",
        ToolTip: "Tests Types Of a Scalar Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VFPCLASSSS.html"
    },
    {
        Title: "VGATHERDPD",
        ToolTip: "Gather Packed DP FP Values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERDPS:VGATHERDPD.html"
    },
    {
        Title: "VGATHERDPD (1)",
        ToolTip: "Gather Packed Single, Packed Double with Signed Dword",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERDPS:VGATHERDPD.html"
    },
    {
        Title: "VGATHERDPS",
        ToolTip: "Gather Packed SP FP values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERDPS:VGATHERQPS.html"
    },
    {
        Title: "VGATHERDPS (1)",
        ToolTip: "Gather Packed Single, Packed Double with Signed Dword",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERDPS:VGATHERDPD.html"
    },
    {
        Title: "VGATHERQPD",
        ToolTip: "Gather Packed DP FP Values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERDPD:VGATHERQPD.html"
    },
    {
        Title: "VGATHERQPD (1)",
        ToolTip: "Gather Packed Single, Packed Double with Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERQPS:VGATHERQPD.html"
    },
    {
        Title: "VGATHERQPS",
        ToolTip: "Gather Packed SP FP values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERDPS:VGATHERQPS.html"
    },
    {
        Title: "VGATHERQPS (1)",
        ToolTip: "Gather Packed Single, Packed Double with Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VGATHERQPS:VGATHERQPD.html"
    },
    {
        Title: "VGETEXPPD",
        ToolTip: "Convert Exponents of Packed DP FP Values to DP FP Values",
        TechURL: "https://www.felixcloutier.com/x86/VGETEXPPD.html"
    },
    {
        Title: "VGETEXPPS",
        ToolTip: "Convert Exponents of Packed SP FP Values to SP FP Values",
        TechURL: "https://www.felixcloutier.com/x86/VGETEXPPS.html"
    },
    {
        Title: "VGETEXPSD",
        ToolTip: "Convert Exponents of Scalar DP FP Values to DP FP Value",
        TechURL: "https://www.felixcloutier.com/x86/VGETEXPSD.html"
    },
    {
        Title: "VGETEXPSS",
        ToolTip: "Convert Exponents of Scalar SP FP Values to SP FP Value",
        TechURL: "https://www.felixcloutier.com/x86/VGETEXPSS.html"
    },
    {
        Title: "VGETMANTPD",
        ToolTip: "Extract Float64 Vector of Normalized Mantissas from Float64 Vector",
        TechURL: "https://www.felixcloutier.com/x86/VGETMANTPD.html"
    },
    {
        Title: "VGETMANTPS",
        ToolTip: "Extract Float32 Vector of Normalized Mantissas from Float32 Vector",
        TechURL: "https://www.felixcloutier.com/x86/VGETMANTPS.html"
    },
    {
        Title: "VGETMANTSD",
        ToolTip: "Extract Float64 of Normalized Mantissas from Float64 Scalar",
        TechURL: "https://www.felixcloutier.com/x86/VGETMANTSD.html"
    },
    {
        Title: "VGETMANTSS",
        ToolTip: "Extract Float32 Vector of Normalized Mantissa from Float32 Vector",
        TechURL: "https://www.felixcloutier.com/x86/VGETMANTSS.html"
    },
    {
        Title: "VINSERTF128",
        ToolTip: "Insert Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTF128:VINSERTF32x4:VINSERTF64x2:VINSERTF32x8:VINSERTF64x4.html"
    },
    {
        Title: "VINSERTF32x4",
        ToolTip: "Insert Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTF128:VINSERTF32x4:VINSERTF64x2:VINSERTF32x8:VINSERTF64x4.html"
    },
    {
        Title: "VINSERTF32x8",
        ToolTip: "Insert Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTF128:VINSERTF32x4:VINSERTF64x2:VINSERTF32x8:VINSERTF64x4.html"
    },
    {
        Title: "VINSERTF64x2",
        ToolTip: "Insert Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTF128:VINSERTF32x4:VINSERTF64x2:VINSERTF32x8:VINSERTF64x4.html"
    },
    {
        Title: "VINSERTF64x4",
        ToolTip: "Insert Packed Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTF128:VINSERTF32x4:VINSERTF64x2:VINSERTF32x8:VINSERTF64x4.html"
    },
    {
        Title: "VINSERTI128",
        ToolTip: "Insert Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTI128:VINSERTI32x4:VINSERTI64x2:VINSERTI32x8:VINSERTI64x4.html"
    },
    {
        Title: "VINSERTI32x4",
        ToolTip: "Insert Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTI128:VINSERTI32x4:VINSERTI64x2:VINSERTI32x8:VINSERTI64x4.html"
    },
    {
        Title: "VINSERTI32x8",
        ToolTip: "Insert Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTI128:VINSERTI32x4:VINSERTI64x2:VINSERTI32x8:VINSERTI64x4.html"
    },
    {
        Title: "VINSERTI64x2",
        ToolTip: "Insert Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTI128:VINSERTI32x4:VINSERTI64x2:VINSERTI32x8:VINSERTI64x4.html"
    },
    {
        Title: "VINSERTI64x4",
        ToolTip: "Insert Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VINSERTI128:VINSERTI32x4:VINSERTI64x2:VINSERTI32x8:VINSERTI64x4.html"
    },
    {
        Title: "VMASKMOV",
        ToolTip: "Conditional SIMD Packed Loads and Stores",
        TechURL: "https://www.felixcloutier.com/x86/VMASKMOV.html"
    },
    {
        Title: "VMOVDQA32",
        ToolTip: "Move Aligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQA:VMOVDQA32:VMOVDQA64.html"
    },
    {
        Title: "VMOVDQA64",
        ToolTip: "Move Aligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQA:VMOVDQA32:VMOVDQA64.html"
    },
    {
        Title: "VMOVDQU16",
        ToolTip: "Move Unaligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQU:VMOVDQU8:VMOVDQU16:VMOVDQU32:VMOVDQU64.html"
    },
    {
        Title: "VMOVDQU32",
        ToolTip: "Move Unaligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQU:VMOVDQU8:VMOVDQU16:VMOVDQU32:VMOVDQU64.html"
    },
    {
        Title: "VMOVDQU64",
        ToolTip: "Move Unaligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQU:VMOVDQU8:VMOVDQU16:VMOVDQU32:VMOVDQU64.html"
    },
    {
        Title: "VMOVDQU8",
        ToolTip: "Move Unaligned Packed Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/MOVDQU:VMOVDQU8:VMOVDQU16:VMOVDQU32:VMOVDQU64.html"
    },
    {
        Title: "VPBLENDD",
        ToolTip: "Blend Packed Dwords",
        TechURL: "https://www.felixcloutier.com/x86/VPBLENDD.html"
    },
    {
        Title: "VPBLENDMB",
        ToolTip: "Blend Byte/Word Vectors Using an Opmask Control",
        TechURL: "https://www.felixcloutier.com/x86/VPBLENDMB:VPBLENDMW.html"
    },
    {
        Title: "VPBLENDMD",
        ToolTip: "Blend Int32/Int64 Vectors Using an OpMask Control",
        TechURL: "https://www.felixcloutier.com/x86/VPBLENDMD:VPBLENDMQ.html"
    },
    {
        Title: "VPBLENDMQ",
        ToolTip: "Blend Int32/Int64 Vectors Using an OpMask Control",
        TechURL: "https://www.felixcloutier.com/x86/VPBLENDMD:VPBLENDMQ.html"
    },
    {
        Title: "VPBLENDMW",
        ToolTip: "Blend Byte/Word Vectors Using an Opmask Control",
        TechURL: "https://www.felixcloutier.com/x86/VPBLENDMB:VPBLENDMW.html"
    },
    {
        Title: "VPBROADCAST",
        ToolTip: "Load Integer and Broadcast",
        TechURL: "https://www.felixcloutier.com/x86/VPBROADCAST.html"
    },
    {
        Title: "VPBROADCASTB",
        ToolTip: "Load with Broadcast Integer Data from General Purpose Register",
        TechURL: "https://www.felixcloutier.com/x86/VPBROADCASTB:VPBROADCASTW:VPBROADCASTD:VPBROADCASTQ.html"
    },
    {
        Title: "VPBROADCASTD",
        ToolTip: "Load with Broadcast Integer Data from General Purpose Register",
        TechURL: "https://www.felixcloutier.com/x86/VPBROADCASTB:VPBROADCASTW:VPBROADCASTD:VPBROADCASTQ.html"
    },
    {
        Title: "VPBROADCASTM",
        ToolTip: "Broadcast Mask to Vector Register",
        TechURL: "https://www.felixcloutier.com/x86/VPBROADCASTM.html"
    },
    {
        Title: "VPBROADCASTQ",
        ToolTip: "Load with Broadcast Integer Data from General Purpose Register",
        TechURL: "https://www.felixcloutier.com/x86/VPBROADCASTB:VPBROADCASTW:VPBROADCASTD:VPBROADCASTQ.html"
    },
    {
        Title: "VPBROADCASTW",
        ToolTip: "Load with Broadcast Integer Data from General Purpose Register",
        TechURL: "https://www.felixcloutier.com/x86/VPBROADCASTB:VPBROADCASTW:VPBROADCASTD:VPBROADCASTQ.html"
    },
    {
        Title: "VPCMPB",
        ToolTip: "Compare Packed Byte Values Into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPB:VPCMPUB.html"
    },
    {
        Title: "VPCMPD",
        ToolTip: "Compare Packed Integer Values into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPD:VPCMPUD.html"
    },
    {
        Title: "VPCMPQ",
        ToolTip: "Compare Packed Integer Values into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPQ:VPCMPUQ.html"
    },
    {
        Title: "VPCMPUB",
        ToolTip: "Compare Packed Byte Values Into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPB:VPCMPUB.html"
    },
    {
        Title: "VPCMPUD",
        ToolTip: "Compare Packed Integer Values into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPD:VPCMPUD.html"
    },
    {
        Title: "VPCMPUQ",
        ToolTip: "Compare Packed Integer Values into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPQ:VPCMPUQ.html"
    },
    {
        Title: "VPCMPUW",
        ToolTip: "Compare Packed Word Values Into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPW:VPCMPUW.html"
    },
    {
        Title: "VPCMPW",
        ToolTip: "Compare Packed Word Values Into Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPCMPW:VPCMPUW.html"
    },
    {
        Title: "VPCOMPRESSD",
        ToolTip: "Store Sparse Packed Doubleword Integer Values into Dense Memory/Register",
        TechURL: "https://www.felixcloutier.com/x86/VPCOMPRESSD.html"
    },
    {
        Title: "VPCOMPRESSQ",
        ToolTip: "Store Sparse Packed Quadword Integer Values into Dense Memory/Register",
        TechURL: "https://www.felixcloutier.com/x86/VPCOMPRESSQ.html"
    },
    {
        Title: "VPCONFLICTD",
        ToolTip: "Detect Conflicts Within a Vector of Packed Dword/Qword Values into Dense Memory/ Register",
        TechURL: "https://www.felixcloutier.com/x86/VPCONFLICTD:VPCONFLICTQ.html"
    },
    {
        Title: "VPCONFLICTQ",
        ToolTip: "Detect Conflicts Within a Vector of Packed Dword/Qword Values into Dense Memory/ Register",
        TechURL: "https://www.felixcloutier.com/x86/VPCONFLICTD:VPCONFLICTQ.html"
    },
    {
        Title: "VPERM2F128",
        ToolTip: "Permute Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VPERM2F128.html"
    },
    {
        Title: "VPERM2I128",
        ToolTip: "Permute Integer Values",
        TechURL: "https://www.felixcloutier.com/x86/VPERM2I128.html"
    },
    {
        Title: "VPERMB",
        ToolTip: "Permute Packed Bytes Elements",
        TechURL: "https://www.felixcloutier.com/x86/VPERMB.html"
    },
    {
        Title: "VPERMD",
        ToolTip: "Permute Packed Doublewords/Words Elements",
        TechURL: "https://www.felixcloutier.com/x86/VPERMD:VPERMW.html"
    },
    {
        Title: "VPERMI2B",
        ToolTip: "Full Permute of Bytes from Two Tables Overwriting the Index",
        TechURL: "https://www.felixcloutier.com/x86/VPERMI2B.html"
    },
    {
        Title: "VPERMI2D",
        ToolTip: "Full Permute From Two Tables Overwriting the Index",
        TechURL: "https://www.felixcloutier.com/x86/VPERMI2W:VPERMI2D:VPERMI2Q:VPERMI2PS:VPERMI2PD.html"
    },
    {
        Title: "VPERMI2PD",
        ToolTip: "Full Permute From Two Tables Overwriting the Index",
        TechURL: "https://www.felixcloutier.com/x86/VPERMI2W:VPERMI2D:VPERMI2Q:VPERMI2PS:VPERMI2PD.html"
    },
    {
        Title: "VPERMI2PS",
        ToolTip: "Full Permute From Two Tables Overwriting the Index",
        TechURL: "https://www.felixcloutier.com/x86/VPERMI2W:VPERMI2D:VPERMI2Q:VPERMI2PS:VPERMI2PD.html"
    },
    {
        Title: "VPERMI2Q",
        ToolTip: "Full Permute From Two Tables Overwriting the Index",
        TechURL: "https://www.felixcloutier.com/x86/VPERMI2W:VPERMI2D:VPERMI2Q:VPERMI2PS:VPERMI2PD.html"
    },
    {
        Title: "VPERMI2W",
        ToolTip: "Full Permute From Two Tables Overwriting the Index",
        TechURL: "https://www.felixcloutier.com/x86/VPERMI2W:VPERMI2D:VPERMI2Q:VPERMI2PS:VPERMI2PD.html"
    },
    {
        Title: "VPERMILPD",
        ToolTip: "Permute In-Lane of Pairs of Double-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VPERMILPD.html"
    },
    {
        Title: "VPERMILPS",
        ToolTip: "Permute In-Lane of Quadruples of Single-Precision Floating-Point Values",
        TechURL: "https://www.felixcloutier.com/x86/VPERMILPS.html"
    },
    {
        Title: "VPERMPD",
        ToolTip: "Permute Double-Precision Floating-Point Elements",
        TechURL: "https://www.felixcloutier.com/x86/VPERMPD.html"
    },
    {
        Title: "VPERMPS",
        ToolTip: "Permute Single-Precision Floating-Point Elements",
        TechURL: "https://www.felixcloutier.com/x86/VPERMPS.html"
    },
    {
        Title: "VPERMQ",
        ToolTip: "Qwords Element Permutation",
        TechURL: "https://www.felixcloutier.com/x86/VPERMQ.html"
    },
    {
        Title: "VPERMT2B",
        ToolTip: "Full Permute of Bytes from Two Tables Overwriting a Table",
        TechURL: "https://www.felixcloutier.com/x86/VPERMT2B.html"
    },
    {
        Title: "VPERMT2D",
        ToolTip: "Full Permute from Two Tables Overwriting one Table",
        TechURL: "https://www.felixcloutier.com/x86/VPERMT2W:VPERMT2D:VPERMT2Q:VPERMT2PS:VPERMT2PD.html"
    },
    {
        Title: "VPERMT2PD",
        ToolTip: "Full Permute from Two Tables Overwriting one Table",
        TechURL: "https://www.felixcloutier.com/x86/VPERMT2W:VPERMT2D:VPERMT2Q:VPERMT2PS:VPERMT2PD.html"
    },
    {
        Title: "VPERMT2PS",
        ToolTip: "Full Permute from Two Tables Overwriting one Table",
        TechURL: "https://www.felixcloutier.com/x86/VPERMT2W:VPERMT2D:VPERMT2Q:VPERMT2PS:VPERMT2PD.html"
    },
    {
        Title: "VPERMT2Q",
        ToolTip: "Full Permute from Two Tables Overwriting one Table",
        TechURL: "https://www.felixcloutier.com/x86/VPERMT2W:VPERMT2D:VPERMT2Q:VPERMT2PS:VPERMT2PD.html"
    },
    {
        Title: "VPERMT2W",
        ToolTip: "Full Permute from Two Tables Overwriting one Table",
        TechURL: "https://www.felixcloutier.com/x86/VPERMT2W:VPERMT2D:VPERMT2Q:VPERMT2PS:VPERMT2PD.html"
    },
    {
        Title: "VPERMW",
        ToolTip: "Permute Packed Doublewords/Words Elements",
        TechURL: "https://www.felixcloutier.com/x86/VPERMD:VPERMW.html"
    },
    {
        Title: "VPEXPANDD",
        ToolTip: "Load Sparse Packed Doubleword Integer Values from Dense Memory / Register",
        TechURL: "https://www.felixcloutier.com/x86/VPEXPANDD.html"
    },
    {
        Title: "VPEXPANDQ",
        ToolTip: "Load Sparse Packed Quadword Integer Values from Dense Memory / Register",
        TechURL: "https://www.felixcloutier.com/x86/VPEXPANDQ.html"
    },
    {
        Title: "VPGATHERDD",
        ToolTip: "Gather Packed Dword Values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERDD:VPGATHERQD.html"
    },
    {
        Title: "VPGATHERDD (1)",
        ToolTip: "Gather Packed Dword, Packed Qword with Signed Dword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERDD:VPGATHERDQ.html"
    },
    {
        Title: "VPGATHERDQ",
        ToolTip: "Gather Packed Dword, Packed Qword with Signed Dword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERDD:VPGATHERDQ.html"
    },
    {
        Title: "VPGATHERDQ (1)",
        ToolTip: "Gather Packed Qword Values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERDQ:VPGATHERQQ.html"
    },
    {
        Title: "VPGATHERQD",
        ToolTip: "Gather Packed Dword Values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERDD:VPGATHERQD.html"
    },
    {
        Title: "VPGATHERQD (1)",
        ToolTip: "Gather Packed Dword, Packed Qword with Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERQD:VPGATHERQQ.html"
    },
    {
        Title: "VPGATHERQQ",
        ToolTip: "Gather Packed Qword Values Using Signed Dword/Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERDQ:VPGATHERQQ.html"
    },
    {
        Title: "VPGATHERQQ (1)",
        ToolTip: "Gather Packed Dword, Packed Qword with Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPGATHERQD:VPGATHERQQ.html"
    },
    {
        Title: "VPLZCNTD",
        ToolTip: "Count the Number of Leading Zero Bits for Packed Dword, Packed Qword Values",
        TechURL: "https://www.felixcloutier.com/x86/VPLZCNTD:VPLZCNTQ.html"
    },
    {
        Title: "VPLZCNTQ",
        ToolTip: "Count the Number of Leading Zero Bits for Packed Dword, Packed Qword Values",
        TechURL: "https://www.felixcloutier.com/x86/VPLZCNTD:VPLZCNTQ.html"
    },
    {
        Title: "VPMADD52HUQ",
        ToolTip: "Packed Multiply of Unsigned 52-bit Unsigned Integers and Add High 52-bit Products to 64-bit Accumulators",
        TechURL: "https://www.felixcloutier.com/x86/VPMADD52HUQ.html"
    },
    {
        Title: "VPMADD52LUQ",
        ToolTip: "Packed Multiply of Unsigned 52-bit Integers and Add the Low 52-bit Products to Qword Accumulators",
        TechURL: "https://www.felixcloutier.com/x86/VPMADD52LUQ.html"
    },
    {
        Title: "VPMASKMOV",
        ToolTip: "Conditional SIMD Integer Packed Loads and Stores",
        TechURL: "https://www.felixcloutier.com/x86/VPMASKMOV.html"
    },
    {
        Title: "VPMOVB2M",
        ToolTip: "Convert a Vector Register to a Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVB2M:VPMOVW2M:VPMOVD2M:VPMOVQ2M.html"
    },
    {
        Title: "VPMOVD2M",
        ToolTip: "Convert a Vector Register to a Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVB2M:VPMOVW2M:VPMOVD2M:VPMOVQ2M.html"
    },
    {
        Title: "VPMOVDB",
        ToolTip: "Down Convert DWord to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVDB:VPMOVSDB:VPMOVUSDB.html"
    },
    {
        Title: "VPMOVDW",
        ToolTip: "Down Convert DWord to Word",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVDW:VPMOVSDW:VPMOVUSDW.html"
    },
    {
        Title: "VPMOVM2B",
        ToolTip: "Convert a Mask Register to a Vector Register",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVM2B:VPMOVM2W:VPMOVM2D:VPMOVM2Q.html"
    },
    {
        Title: "VPMOVM2D",
        ToolTip: "Convert a Mask Register to a Vector Register",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVM2B:VPMOVM2W:VPMOVM2D:VPMOVM2Q.html"
    },
    {
        Title: "VPMOVM2Q",
        ToolTip: "Convert a Mask Register to a Vector Register",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVM2B:VPMOVM2W:VPMOVM2D:VPMOVM2Q.html"
    },
    {
        Title: "VPMOVM2W",
        ToolTip: "Convert a Mask Register to a Vector Register",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVM2B:VPMOVM2W:VPMOVM2D:VPMOVM2Q.html"
    },
    {
        Title: "VPMOVQ2M",
        ToolTip: "Convert a Vector Register to a Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVB2M:VPMOVW2M:VPMOVD2M:VPMOVQ2M.html"
    },
    {
        Title: "VPMOVQB",
        ToolTip: "Down Convert QWord to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQB:VPMOVSQB:VPMOVUSQB.html"
    },
    {
        Title: "VPMOVQD",
        ToolTip: "Down Convert QWord to DWord",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQD:VPMOVSQD:VPMOVUSQD.html"
    },
    {
        Title: "VPMOVQW",
        ToolTip: "Down Convert QWord to Word",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQW:VPMOVSQW:VPMOVUSQW.html"
    },
    {
        Title: "VPMOVSDB",
        ToolTip: "Down Convert DWord to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVDB:VPMOVSDB:VPMOVUSDB.html"
    },
    {
        Title: "VPMOVSDW",
        ToolTip: "Down Convert DWord to Word",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVDW:VPMOVSDW:VPMOVUSDW.html"
    },
    {
        Title: "VPMOVSQB",
        ToolTip: "Down Convert QWord to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQB:VPMOVSQB:VPMOVUSQB.html"
    },
    {
        Title: "VPMOVSQD",
        ToolTip: "Down Convert QWord to DWord",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQD:VPMOVSQD:VPMOVUSQD.html"
    },
    {
        Title: "VPMOVSQW",
        ToolTip: "Down Convert QWord to Word",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQW:VPMOVSQW:VPMOVUSQW.html"
    },
    {
        Title: "VPMOVSWB",
        ToolTip: "Down Convert Word to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVWB:VPMOVSWB:VPMOVUSWB.html"
    },
    {
        Title: "VPMOVUSDB",
        ToolTip: "Down Convert DWord to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVDB:VPMOVSDB:VPMOVUSDB.html"
    },
    {
        Title: "VPMOVUSDW",
        ToolTip: "Down Convert DWord to Word",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVDW:VPMOVSDW:VPMOVUSDW.html"
    },
    {
        Title: "VPMOVUSQB",
        ToolTip: "Down Convert QWord to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQB:VPMOVSQB:VPMOVUSQB.html"
    },
    {
        Title: "VPMOVUSQD",
        ToolTip: "Down Convert QWord to DWord",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQD:VPMOVSQD:VPMOVUSQD.html"
    },
    {
        Title: "VPMOVUSQW",
        ToolTip: "Down Convert QWord to Word",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVQW:VPMOVSQW:VPMOVUSQW.html"
    },
    {
        Title: "VPMOVUSWB",
        ToolTip: "Down Convert Word to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVWB:VPMOVSWB:VPMOVUSWB.html"
    },
    {
        Title: "VPMOVW2M",
        ToolTip: "Convert a Vector Register to a Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVB2M:VPMOVW2M:VPMOVD2M:VPMOVQ2M.html"
    },
    {
        Title: "VPMOVWB",
        ToolTip: "Down Convert Word to Byte",
        TechURL: "https://www.felixcloutier.com/x86/VPMOVWB:VPMOVSWB:VPMOVUSWB.html"
    },
    {
        Title: "VPMULTISHIFTQB",
        ToolTip: "Select Packed Unaligned Bytes from Quadword Sources",
        TechURL: "https://www.felixcloutier.com/x86/VPMULTISHIFTQB.html"
    },
    {
        Title: "VPROLD",
        ToolTip: "Bit Rotate Left",
        TechURL: "https://www.felixcloutier.com/x86/VPROLD:VPROLVD:VPROLQ:VPROLVQ.html"
    },
    {
        Title: "VPROLQ",
        ToolTip: "Bit Rotate Left",
        TechURL: "https://www.felixcloutier.com/x86/VPROLD:VPROLVD:VPROLQ:VPROLVQ.html"
    },
    {
        Title: "VPROLVD",
        ToolTip: "Bit Rotate Left",
        TechURL: "https://www.felixcloutier.com/x86/VPROLD:VPROLVD:VPROLQ:VPROLVQ.html"
    },
    {
        Title: "VPROLVQ",
        ToolTip: "Bit Rotate Left",
        TechURL: "https://www.felixcloutier.com/x86/VPROLD:VPROLVD:VPROLQ:VPROLVQ.html"
    },
    {
        Title: "VPRORD",
        ToolTip: "Bit Rotate Right",
        TechURL: "https://www.felixcloutier.com/x86/VPRORD:VPRORVD:VPRORQ:VPRORVQ.html"
    },
    {
        Title: "VPRORQ",
        ToolTip: "Bit Rotate Right",
        TechURL: "https://www.felixcloutier.com/x86/VPRORD:VPRORVD:VPRORQ:VPRORVQ.html"
    },
    {
        Title: "VPRORVD",
        ToolTip: "Bit Rotate Right",
        TechURL: "https://www.felixcloutier.com/x86/VPRORD:VPRORVD:VPRORQ:VPRORVQ.html"
    },
    {
        Title: "VPRORVQ",
        ToolTip: "Bit Rotate Right",
        TechURL: "https://www.felixcloutier.com/x86/VPRORD:VPRORVD:VPRORQ:VPRORVQ.html"
    },
    {
        Title: "VPSCATTERDD",
        ToolTip: "Scatter Packed Dword, Packed Qword with Signed Dword, Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPSCATTERDD:VPSCATTERDQ:VPSCATTERQD:VPSCATTERQQ.html"
    },
    {
        Title: "VPSCATTERDQ",
        ToolTip: "Scatter Packed Dword, Packed Qword with Signed Dword, Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPSCATTERDD:VPSCATTERDQ:VPSCATTERQD:VPSCATTERQQ.html"
    },
    {
        Title: "VPSCATTERQD",
        ToolTip: "Scatter Packed Dword, Packed Qword with Signed Dword, Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPSCATTERDD:VPSCATTERDQ:VPSCATTERQD:VPSCATTERQQ.html"
    },
    {
        Title: "VPSCATTERQQ",
        ToolTip: "Scatter Packed Dword, Packed Qword with Signed Dword, Signed Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VPSCATTERDD:VPSCATTERDQ:VPSCATTERQD:VPSCATTERQQ.html"
    },
    {
        Title: "VPSLLVD",
        ToolTip: "Variable Bit Shift Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/VPSLLVW:VPSLLVD:VPSLLVQ.html"
    },
    {
        Title: "VPSLLVQ",
        ToolTip: "Variable Bit Shift Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/VPSLLVW:VPSLLVD:VPSLLVQ.html"
    },
    {
        Title: "VPSLLVW",
        ToolTip: "Variable Bit Shift Left Logical",
        TechURL: "https://www.felixcloutier.com/x86/VPSLLVW:VPSLLVD:VPSLLVQ.html"
    },
    {
        Title: "VPSRAVD",
        ToolTip: "Variable Bit Shift Right Arithmetic",
        TechURL: "https://www.felixcloutier.com/x86/VPSRAVW:VPSRAVD:VPSRAVQ.html"
    },
    {
        Title: "VPSRAVQ",
        ToolTip: "Variable Bit Shift Right Arithmetic",
        TechURL: "https://www.felixcloutier.com/x86/VPSRAVW:VPSRAVD:VPSRAVQ.html"
    },
    {
        Title: "VPSRAVW",
        ToolTip: "Variable Bit Shift Right Arithmetic",
        TechURL: "https://www.felixcloutier.com/x86/VPSRAVW:VPSRAVD:VPSRAVQ.html"
    },
    {
        Title: "VPSRLVD",
        ToolTip: "Variable Bit Shift Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/VPSRLVW:VPSRLVD:VPSRLVQ.html"
    },
    {
        Title: "VPSRLVQ",
        ToolTip: "Variable Bit Shift Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/VPSRLVW:VPSRLVD:VPSRLVQ.html"
    },
    {
        Title: "VPSRLVW",
        ToolTip: "Variable Bit Shift Right Logical",
        TechURL: "https://www.felixcloutier.com/x86/VPSRLVW:VPSRLVD:VPSRLVQ.html"
    },
    {
        Title: "VPTERNLOGD",
        ToolTip: "Bitwise Ternary Logic",
        TechURL: "https://www.felixcloutier.com/x86/VPTERNLOGD:VPTERNLOGQ.html"
    },
    {
        Title: "VPTERNLOGQ",
        ToolTip: "Bitwise Ternary Logic",
        TechURL: "https://www.felixcloutier.com/x86/VPTERNLOGD:VPTERNLOGQ.html"
    },
    {
        Title: "VPTESTMB",
        ToolTip: "Logical AND and Set Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTMB:VPTESTMW:VPTESTMD:VPTESTMQ.html"
    },
    {
        Title: "VPTESTMD",
        ToolTip: "Logical AND and Set Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTMB:VPTESTMW:VPTESTMD:VPTESTMQ.html"
    },
    {
        Title: "VPTESTMQ",
        ToolTip: "Logical AND and Set Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTMB:VPTESTMW:VPTESTMD:VPTESTMQ.html"
    },
    {
        Title: "VPTESTMW",
        ToolTip: "Logical AND and Set Mask",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTMB:VPTESTMW:VPTESTMD:VPTESTMQ.html"
    },
    {
        Title: "VPTESTNMB",
        ToolTip: "Logical NAND and Set",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTNMB:VPTESTNMW:VPTESTNMD:VPTESTNMQ.html"
    },
    {
        Title: "VPTESTNMD",
        ToolTip: "Logical NAND and Set",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTNMB:VPTESTNMW:VPTESTNMD:VPTESTNMQ.html"
    },
    {
        Title: "VPTESTNMQ",
        ToolTip: "Logical NAND and Set",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTNMB:VPTESTNMW:VPTESTNMD:VPTESTNMQ.html"
    },
    {
        Title: "VPTESTNMW",
        ToolTip: "Logical NAND and Set",
        TechURL: "https://www.felixcloutier.com/x86/VPTESTNMB:VPTESTNMW:VPTESTNMD:VPTESTNMQ.html"
    },
    {
        Title: "VRANGEPD",
        ToolTip: "Range Restriction Calculation For Packed Pairs of Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRANGEPD.html"
    },
    {
        Title: "VRANGEPS",
        ToolTip: "Range Restriction Calculation For Packed Pairs of Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRANGEPS.html"
    },
    {
        Title: "VRANGESD",
        ToolTip: "Range Restriction Calculation From a pair of Scalar Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRANGESD.html"
    },
    {
        Title: "VRANGESS",
        ToolTip: "Range Restriction Calculation From a Pair of Scalar Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRANGESS.html"
    },
    {
        Title: "VRCP14PD",
        ToolTip: "Compute Approximate Reciprocals of Packed Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRCP14PD.html"
    },
    {
        Title: "VRCP14PS",
        ToolTip: "Compute Approximate Reciprocals of Packed Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRCP14PS.html"
    },
    {
        Title: "VRCP14SD",
        ToolTip: "Compute Approximate Reciprocal of Scalar Float64 Value",
        TechURL: "https://www.felixcloutier.com/x86/VRCP14SD.html"
    },
    {
        Title: "VRCP14SS",
        ToolTip: "Compute Approximate Reciprocal of Scalar Float32 Value",
        TechURL: "https://www.felixcloutier.com/x86/VRCP14SS.html"
    },
    {
        Title: "VREDUCEPD",
        ToolTip: "Perform Reduction Transformation on Packed Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VREDUCEPD.html"
    },
    {
        Title: "VREDUCEPS",
        ToolTip: "Perform Reduction Transformation on Packed Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VREDUCEPS.html"
    },
    {
        Title: "VREDUCESD",
        ToolTip: "Perform a Reduction Transformation on a Scalar Float64 Value",
        TechURL: "https://www.felixcloutier.com/x86/VREDUCESD.html"
    },
    {
        Title: "VREDUCESS",
        ToolTip: "Perform a Reduction Transformation on a Scalar Float32 Value",
        TechURL: "https://www.felixcloutier.com/x86/VREDUCESS.html"
    },
    {
        Title: "VRNDSCALEPD",
        ToolTip: "Round Packed Float64 Values To Include A Given Number Of Fraction Bits",
        TechURL: "https://www.felixcloutier.com/x86/VRNDSCALEPD.html"
    },
    {
        Title: "VRNDSCALEPS",
        ToolTip: "Round Packed Float32 Values To Include A Given Number Of Fraction Bits",
        TechURL: "https://www.felixcloutier.com/x86/VRNDSCALEPS.html"
    },
    {
        Title: "VRNDSCALESD",
        ToolTip: "Round Scalar Float64 Value To Include A Given Number Of Fraction Bits",
        TechURL: "https://www.felixcloutier.com/x86/VRNDSCALESD.html"
    },
    {
        Title: "VRNDSCALESS",
        ToolTip: "Round Scalar Float32 Value To Include A Given Number Of Fraction Bits",
        TechURL: "https://www.felixcloutier.com/x86/VRNDSCALESS.html"
    },
    {
        Title: "VRSQRT14PD",
        ToolTip: "Compute Approximate Reciprocals of Square Roots of Packed Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRSQRT14PD.html"
    },
    {
        Title: "VRSQRT14PS",
        ToolTip: "Compute Approximate Reciprocals of Square Roots of Packed Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VRSQRT14PS.html"
    },
    {
        Title: "VRSQRT14SD",
        ToolTip: "Compute Approximate Reciprocal of Square Root of Scalar Float64 Value",
        TechURL: "https://www.felixcloutier.com/x86/VRSQRT14SD.html"
    },
    {
        Title: "VRSQRT14SS",
        ToolTip: "Compute Approximate Reciprocal of Square Root of Scalar Float32 Value",
        TechURL: "https://www.felixcloutier.com/x86/VRSQRT14SS.html"
    },
    {
        Title: "VSCALEFPD",
        ToolTip: "Scale Packed Float64 Values With Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VSCALEFPD.html"
    },
    {
        Title: "VSCALEFPS",
        ToolTip: "Scale Packed Float32 Values With Float32 Values",
        TechURL: "https://www.felixcloutier.com/x86/VSCALEFPS.html"
    },
    {
        Title: "VSCALEFSD",
        ToolTip: "Scale Scalar Float64 Values With Float64 Values",
        TechURL: "https://www.felixcloutier.com/x86/VSCALEFSD.html"
    },
    {
        Title: "VSCALEFSS",
        ToolTip: "Scale Scalar Float32 Value With Float32 Value",
        TechURL: "https://www.felixcloutier.com/x86/VSCALEFSS.html"
    },
    {
        Title: "VSCATTERDPD",
        ToolTip: "Scatter Packed Single, Packed Double with Signed Dword and Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VSCATTERDPS:VSCATTERDPD:VSCATTERQPS:VSCATTERQPD.html"
    },
    {
        Title: "VSCATTERDPS",
        ToolTip: "Scatter Packed Single, Packed Double with Signed Dword and Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VSCATTERDPS:VSCATTERDPD:VSCATTERQPS:VSCATTERQPD.html"
    },
    {
        Title: "VSCATTERQPD",
        ToolTip: "Scatter Packed Single, Packed Double with Signed Dword and Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VSCATTERDPS:VSCATTERDPD:VSCATTERQPS:VSCATTERQPD.html"
    },
    {
        Title: "VSCATTERQPS",
        ToolTip: "Scatter Packed Single, Packed Double with Signed Dword and Qword Indices",
        TechURL: "https://www.felixcloutier.com/x86/VSCATTERDPS:VSCATTERDPD:VSCATTERQPS:VSCATTERQPD.html"
    },
    {
        Title: "VSHUFF32x4",
        ToolTip: "Shuffle Packed Values at 128-bit Granularity",
        TechURL: "https://www.felixcloutier.com/x86/VSHUFF32x4:VSHUFF64x2:VSHUFI32x4:VSHUFI64x2.html"
    },
    {
        Title: "VSHUFF64x2",
        ToolTip: "Shuffle Packed Values at 128-bit Granularity",
        TechURL: "https://www.felixcloutier.com/x86/VSHUFF32x4:VSHUFF64x2:VSHUFI32x4:VSHUFI64x2.html"
    },
    {
        Title: "VSHUFI32x4",
        ToolTip: "Shuffle Packed Values at 128-bit Granularity",
        TechURL: "https://www.felixcloutier.com/x86/VSHUFF32x4:VSHUFF64x2:VSHUFI32x4:VSHUFI64x2.html"
    },
    {
        Title: "VSHUFI64x2",
        ToolTip: "Shuffle Packed Values at 128-bit Granularity",
        TechURL: "https://www.felixcloutier.com/x86/VSHUFF32x4:VSHUFF64x2:VSHUFI32x4:VSHUFI64x2.html"
    },
    {
        Title: "VTESTPD",
        ToolTip: "Packed Bit Test",
        TechURL: "https://www.felixcloutier.com/x86/VTESTPD:VTESTPS.html"
    },
    {
        Title: "VTESTPS",
        ToolTip: "Packed Bit Test",
        TechURL: "https://www.felixcloutier.com/x86/VTESTPD:VTESTPS.html"
    },
    {
        Title: "VZEROALL",
        ToolTip: "Zero All YMM Registers",
        TechURL: "https://www.felixcloutier.com/x86/VZEROALL.html"
    },
    {
        Title: "VZEROUPPER",
        ToolTip: "Zero Upper Bits of YMM Registers",
        TechURL: "https://www.felixcloutier.com/x86/VZEROUPPER.html"
    },
    {
        Title: "WRFSBASE",
        ToolTip: "Write FS/GS Segment Base",
        TechURL: "https://www.felixcloutier.com/x86/WRFSBASE:WRGSBASE.html"
    },
    {
        Title: "WRGSBASE",
        ToolTip: "Write FS/GS Segment Base",
        TechURL: "https://www.felixcloutier.com/x86/WRFSBASE:WRGSBASE.html"
    },
    {
        Title: "WRMSR",
        ToolTip: "Write to Model Specific Register",
        TechURL: "https://www.felixcloutier.com/x86/WRMSR.html"
    },
    {
        Title: "WRPKRU",
        ToolTip: "Write Data to User Page Key Register",
        TechURL: "https://www.felixcloutier.com/x86/WRPKRU.html"
    },
    {
        Title: "XABORT",
        ToolTip: "Transactional Abort",
        TechURL: "https://www.felixcloutier.com/x86/XABORT.html"
    },
    {
        Title: "XACQUIRE",
        ToolTip: "Hardware Lock Elision Prefix Hints",
        TechURL: "https://www.felixcloutier.com/x86/XACQUIRE:XRELEASE.html"
    },
    {
        Title: "XADD",
        ToolTip: "Exchange and Add",
        TechURL: "https://www.felixcloutier.com/x86/XADD.html"
    },
    {
        Title: "XBEGIN",
        ToolTip: "Transactional Begin",
        TechURL: "https://www.felixcloutier.com/x86/XBEGIN.html"
    },
    {
        Title: "XEND",
        ToolTip: "Transactional End",
        TechURL: "https://www.felixcloutier.com/x86/XEND.html"
    },
    {
        Title: "XGETBV",
        ToolTip: "Get Value of Extended Control Register",
        TechURL: "https://www.felixcloutier.com/x86/XGETBV.html"
    },
    {
        Title: "XLAT",
        ToolTip: "Table Look-up Translation",
        TechURL: "https://www.felixcloutier.com/x86/XLAT:XLATB.html"
    },
    {
        Title: "XLATB",
        ToolTip: "Table Look-up Translation",
        TechURL: "https://www.felixcloutier.com/x86/XLAT:XLATB.html"
    },

    {
        Title: "XORPD",
        ToolTip: "Bitwise Logical XOR of Packed Double Precision Floating - Point Values",
        TechURL: "https://www.felixcloutier.com/x86/XLAT:XLATB.html"
    },
{
    Title: "XORPS",
ToolTip: "Bitwise Logical XOR of Packed Single Precision Floating - Point Values",
    TechURL: "https://www.felixcloutier.com/x86/XORPS.html"
},

{
    Title: "XRELEASE",
ToolTip: "Hardware Lock Elision Prefix Hints",
    TechURL: "https://www.felixcloutier.com/x86/XACQUIRE:XRELEASE.html"
},

{
    Title: "XRSTOR",
ToolTip: "Restore Processor Extended States",
    TechURL: "https://www.felixcloutier.com/x86/XRSTOR.html"
},

{
    Title: "XRSTORS",
ToolTip: "Restore Processor Extended States Supervisor",
    TechURL: "https://www.felixcloutier.com/x86/XRSTORS.html"
},

{
    Title: "XSAVE",
ToolTip: "Save Processor Extended States",
    TechURL: "https://www.felixcloutier.com/x86/XSAVE.html"
},

{
    Title: "XSAVEC",
ToolTip: "Save Processor Extended States with Compaction",
    TechURL: "https://www.felixcloutier.com/x86/XSAVEC.html"
},

{
    Title: "XSAVEOPT",
ToolTip: "Save Processor Extended States Optimized",
    TechURL: "https://www.felixcloutier.com/x86/XSAVEOPT.html"
},

{
    Title: "XSAVES",
ToolTip: "Save Processor Extended States Supervisor",
    TechURL: "https://www.felixcloutier.com/x86/XSAVES.html"
},

{
    Title: "XSETBV",
ToolTip: "Set Extended Control Register",
    TechURL: "https://www.felixcloutier.com/x86/XSETBV.html"
},

    {
        Title: "XTEST",
        ToolTip: "Test If In Transactional Execution",
        TechURL: "https://www.felixcloutier.com/x86/XTEST.html"
    }


];


function populateMnumonicsList(targetlist) {
    //<li><div class="tooltip">AAA<span class="tooltiptext tooltip-bottom"><b>AAA</b><br />Operand not valid in 64-bit mode :`(</span></div></li>

    /*
     Title: "AAA",
        ToolTip: "Operand not valid in 64-bit mode :`(",
        Popup: "",
        TechURL: "https://www.felixcloutier.com/x86/AAA.html",
        FurtherReading: "",
        FutherReadingURL: "",
        VideoURL: ""
     */

    for (var i = 0; i < implementedMnumonics.length; i++) {
        var item = implementedMnumonics[i];
        //var listitem = $("<li><div class='tooltip'>" + item.Title + "<span class='tooltiptext tooltip-bottom'><b>" + item.Title + "</b><br />" + item.ToolTip + "</span></div></li>");
        var listitem = document.createElement("li");

        var click = "";

        if (item.Popup.length > 0)
            click = "onclick='onMnumonicClick(" + i + ");'";

        listitem.innerHTML = "<div class='tooltip' " + click + ">" + item.Title + "<span class='tooltiptext tooltip-bottom'><b>" + item.Title + "</b><br />" + item.ToolTip + "</span></div>";
        targetlist.append(listitem);
    }
}

function onMnumonicClick(index) {
    var item = implementedMnumonics[index];

    document.getElementById("mnumonicTitle").innerHTML = item.Title;
    document.getElementById("mnumonicPopupValue").innerHTML = item.Popup;

    document.getElementById("mnumonicVideo").innerHTML = "";

    document.getElementById("mnumonicTechDocs").innerHTML = "";
    document.getElementById("mnumonicFurtherReading").innerHTML = "";

    if (item.VideoURL.length > 0) {
        var vidlink = document.createElement("video");
        vidlink.setAttribute("src", item.VideoURL);

        document.getElementById("mnumonicVideo").innerHTML = vidlink;
    }

    if (item.TechURL.length > 0) {
        var techlink = document.createElement("a");
        techlink.setAttribute("target", "_blank");
        techlink.setAttribute("href", item.TechURL);
        techlink.innerHTML = "Technical Reading";
        document.getElementById("mnumonicTechDocs").append(techlink);
    }


    if (item.FurtherReading.length > 0) {
        var frlink = document.createElement("a");
        frlink.setAttribute("target", "_blank");
        frlink.setAttribute("href", item.FutherReadingURL);
        frlink.innerHTML = item.FurtherReading;
        document.getElementById("mnumonicFurtherReading").innerHTML = frlink;
    }

    $("#modal-mnemonics").addClass("md-show");
}

function populateMnumonicsNotImplementedList(targetlist) {
    //<li><div class="tooltip">AAA<span class="tooltiptext tooltip-bottom"><b>AAA</b><br />Operand not valid in 64-bit mode :`(</span></div></li>

    /*
        Title: "ADCX",
        ToolTip: "Unsigned Integer Addition of Two Operands with Carry Flag",
        TechURL: "https://www.felixcloutier.com/x86/ADCX.html"
     */

    for (var i = 0; i < unimplementedMnumonics.length; i++) {
        var item = unimplementedMnumonics[i];
        var listitem = document.createElement("li");

        var text = document.createElement("div");
        if (item.ToolTip.length > 0) {
            text.innerHTML = item.Title + "<span class='tooltiptext tooltip-bottom'><b>" + item.Title + "</b><br />" + item.ToolTip + "</span>";
            text.classList.add("tooltip");
        }
        else {
            text.innerHTML = item.Title;
        }

        if (item.TechURL.length > 0) {
            var techlink = document.createElement("a");
            techlink.setAttribute("target", "_blank");
            techlink.setAttribute("href", item.TechURL);
            techlink.append(text);

            listitem.append(techlink);
        }
        else
            listitem.append(text);


        targetlist.append(listitem);
    }
}