var x86samples = [
    {
        Title: "call Windows MessageBox API",
        Code: "; Sample x64 Assembly Program\n" + 
              "; Chris Lomont 2009 www.lomont.org\n" + 
              "extrn ExitProcess: PROC; external functions in system libraries\n" +
              "extrn MessageBoxA: PROC\n" +
              "\n" +
              ".data\n" +
              "\tcaption db '64-bit hello!', 0\n" +
              "\tmessage db 'Hello World!', 0\n" +
              "\n" +
              ".code\n" +
              "\tStart PROC\n" +
              "\tMOV   RCX, 0; hWnd = HWND_DESKTOP\n" +
              "\tMOV   RDX, message; LPCSTR lpText\n" +
              "\tMOV   R8, caption; LPCSTR lpCaption\n" +
              "\tMOV   R9, 0; uType = MB_OK\n" +
              "\tcall   MessageBoxA; call MessageBox API function\n" +
              "\tmov    ecx, eax; uExitCode = MessageBox(...)\n" +
              "\tcall ExitProcess\n" +
              "\tStart ENDP\n" +
              "\tEnd"
    },
    {
        Title: "Bubble sort 10 numbers in place",
        Code: ";Bubble sort 10 numbers in place\n" +
				"; https://github.com/mish24/Assembly-step-by-step\n" +
				"\n" +
				".data\n" +
				"nums  db 3, 7, 9, 1, 8, 2, 4, 5, 3, 6, 10\n" +
				"; count equ 9; One less than count of the array.\n" +
				"\n" +
				"\n" +
				".code\n" +
				"startup:\n" +
				"mov dx, LENGTH nums;[count]\n" +
				"DEC dx\n" +
				"oloop:\n" +
				"mov cx, LENGTH nums;[count]\n" +
				"DEC cx\n" +
				"lea si, nums\n" +
				"mov R8, 0\n" +
				"\n" +
				"iloop:\n" +
				"mov al, [si]; Because compare can't have both memory\n" +
				"cmp al, BYTE[si + 1]\n" +
				"jle common; if al is less than[si + 1]\n" +
				"; Skip the below two lines for swapping.\n" +
				"xchg al, BYTE[si + 1]\n" +
				"; Coz we can't use two memory locations in xchg directly.\n" +
				"mov BYTE[si], al\n" +
				"inc R8\n" +
				"\n" +
				"common:\n" +
				"INC si\n" +
				"loop iloop\n" +
				"\n" +
				"cmp R8, 0 ; We use R8 to count the number of exhanges done per loop.\n" +
				"jz exit ; When no exchange was made we're sorted so early exit.\n" +
				"\n" +
				"dec dx\n" +
				"jnz oloop\n" +
				"\n" +
				"exit:\n" +
				"end\n"
	},
    {
        Title: "Reverse String",
        Code: ".data\n" + 
            "reversed db 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0\n" + 
            "message db 'Hello World!', 0\n" + 
            "msgLen db 13\n" + 
            ".code\n" + 
            "mov cl, [msgLen]\n" + 
            "mov bl, [msgLen]\n" + 
            "dec bl\n" + 
            "dec bl\n" + 
            "next:\n" + 
            "mov al, [message + dx]\n" + 
            "mov[reversed + bl], al\n" + 
            "inc dx\n" + 
            "dec bl\n" + 
            "loopnz next"
    },
    {
        Title: "Insertion sort",
        Code: ";Code by Miguel Casillas.\n" + 
            "; This code can be used and reproduced, please give credit\n" + 
            "; http://www.miguelcasillas.com/?p=348\n" +
            "\n" + 
            ";TODO: This sample isn't quite working yet!\n" + 
            "\n" + 
            ".data\n" +
            "\n" +
            "\n" +
            "\n" + 
            "    .code\n" +
            "\n" + 
            "    ; void InsertionSort(void * pArray, int nItems);\n" + 
            "InsertionSort PROC\n" +
            "\n" + 
            "    ; These registers must be restored at the end\n" + 
            "push EBP\n" + 
            "mov  EBP, ESP\n" + 
            "push EBX\n" + 
            "push ESI\n" + 
            "push EDI\n" +
            "\n" +
            "    ; EBP + 8    is the array\n" + 
            "    ; EBP + 12   is the number of items in the array\n" +
            "\n" + 
            "    ; setting ECX to the number of items\n" + 
            "    ; we multiply by 4(size of the element) in order to put ECX\n" + 
            "    ; at the last address of the array\n" + 
            "mov EAX, [EBP + 12]\n" + 
            "mov ECX, 4\n" + 
            "mul ECX\n" + 
            "mov ECX, EAX\n" +
            "\n" + 
            "    ; We will move 'i' and 'j' in increments and decrements of 4,\n" + 
            "    ; which is the size of the elements\n" + 
            "mov EAX, 4; EAX will be our 'i'\n" + 
            "xor EBX, EBX; EBX will be our 'j'(setting it to 0)\n" + 
            "mov ESI, [EBP + 8]; ESI is the array\n" +
            "\n" + 
            "MainLoop:\n" + 
            "; If 'i' >= the number of items, exit the loop\n" + 
            "cmp EAX, ECX\n" + 
            "jge EndLoop\n" +
            "\n" + 
            "    ; Save our \"number of items\" value, we'll restore it later\n" + 
            "push ECX\n" +
            "\n" + 
            "    ; ECX is now our \"key\", so, ECX = array[i]\n" + 
            "mov ECX, [ESI + EAX]\n" +
            "\n" + 
            "    ; j = i - 1\n" + 
            "mov EBX, EAX\n" + 
            "sub EBX, 4\n" +
            "\n" + 
            "EnterWhile:\n" + 
            "; If j < 0, exit this loop\n" + 
            "cmp EBX, 0\n" + 
            "jl EndWhile\n" +
            "\n" + 
            "    ; If array[j] <= key, exit this loop\n" + 
            "cmp[ESI + EBX], ECX\n" + 
            "jle EndWhile\n" +
            "\n" + 
            "    ; array[j + 1] = array[j]\n" + 
            "push[ESI + EBX]\n" +
            "\n" + 
            "pop[ESI + EBX + 4]\n" +
            "\n" + 
            "    ; j--\n" + 
            "sub EBX, 4\n" +
            "\n" + 
            "    ; Go back to the top of this loop\n" + 
            "jmp EnterWhile\n" +
            "\n" +
            "EndWhile:\n" +
            "\n" + 
            "; array[j + 1] = key\n" + 
            "mov[ESI + EBX + 4], ECX\n" +
            "\n" + 
            "    ; i++\n" + 
            "add EAX, 4\n" +
            "\n" + 
            "    ; restore our \"number of items\" value\n" + 
            "pop ECX\n" +
            "\n" + 
            "    ; Go back to the top of the main loop\n" + 
            "jmp MainLoop\n" +
            "\n" + 
            "EndLoop:\n" +
            "\n" + 
            "; Restoring the registers\n" + 
            "pop EDI\n" + 
            "pop ESI\n" + 
            "pop EBX\n" + 
            "pop EBP\n" +
            "\n" + 
            "RET\n" + 
            "InsertionSort ENDP\n" +
            "\n" + 
            "start PROC\n" +
            "\n" + 
            "start ENDP"
    },
    {
        Title: "Write Line to Terminal",
        Code: ".data\n" +
            "    message db 'Hello World!\nMultiline and all!', 0\n" +
            ".code\n" +
            "\n" +
            "    mov cx, length message\n" +
            "    mov bx, 0\n" +
            "    mov ah, 2\n" +
            "\n" +
            "    nextchar:\n" +
            "\n" +
            "        mov dl, [message + bx]\n" +
            "        int 0x21\n" +
            "        inc bx\n" +
            "; cmp dl, 0\n" +
            "loopnz nextchar"
    },
    {
        Title: "Input name and reply",
        Code: ".data\n" +
            "    entername db 'Please Enter your name\n$'\n" +
            "    msg db 'Hello $'\n" +
            "    message db 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0\n" +
            "\n" +
            ".code\n" +
            "\n" +
            "    mov dx, entername \n" +
            "    mov ah, 9\n" +
            "    int 0x21 ; Call Print String(entername)\n" +
            "\n" +
            "    mov ah, 8\n" +
            "    mov bx, 0\n" +
            "\n" +
            "    nextchar:\n" +
            "\n" +
            "        int 0x21 ; Get Char\n" +
            "        mov [message + bx], al\n" +
            "        inc bx\n" +
            "        cmp al, 13 ; Press Enter to quit\n" +
            "    loopnz nextchar\n" +
            "\n" +
            "        dec bx\n" +
            "        mov [message + bx], BYTE 0x24 ; $\n" +
            "\n" +
            "\n" +
            "    mov ah, 9\n" +
            "    mov dx, msg \n" +
            "    int 0x21 ; Print(Hello)\n" +
            "    mov dx, message\n" +
            "    int 0x21 ; Print Name"
    },
    {
        Title: "Print Date and Time",
        Code: ".data\n" +
            "\n" +
            "year dw 0\n" +
            "month db 0\n" +
            "day db 0\n" +
            "dayofweek db 0\n" +
            "hour db 0\n" +
            "min db 0\n" +
            "second db 0\n" +
            "hundredth db 0\n" +
            "const10    dd 10\n" +
            "msg db 'The Date and Time is:\n$'\n" +
            "\n" +
            ".code\n" +
            "\n" +
            "MOV ah, 0x09 ; Print $ terminated string\n" +
"MOV dx, msg\n" +
"INT 0x21\n" +
            "\n" +
            "\n" +
            "MOV ah, 0x2A ;Get Date\n" +
            "INT 0x21\n" +
            "\n" +
            "MOV[year], CX\n" +
            "INC DH ; Add one because month is 0 - 11\n" +
            "MOV [month], DH\n" +
            "MOV[day], DL\n" +
            "MOV[dayofweek], AL\n" +
            "\n" +
            "MOV ah, 0x2C ;Get Time\n" +
            "INT 0x21\n" +
            "\n" +
            "MOV[hour], CH\n" +
            "MOV[min], CL\n" +
            "MOV[second], DH\n" +
            "MOV[hundredth], DL\n" +
            "\n" +
            "MOV eax, WORD [year]\n" +
            "call printNumber \n" +
            "mov al, 0x2D ; '-'\n" +
            "call printCharacter\n" +
            "xor eax, eax\n" +
            "MOV eax, byte [month]\n" +
            "call printNumber \n" +
            "mov al, 0x2D ; '-'\n" +
            "call printCharacter\n" +
            "xor eax, eax\n" +
            "MOV eax, byte [day]\n" +
            "call printNumber \n" +
            "\n" +
            "mov al, 0x20 ; ' '\n" +
            "call printCharacter\n" +
            "\n" +
            "MOV eax, BYTE [hour]\n" +
            "call printNumber \n" +
            "mov al, 0x3A ; ':'\n" +
            "call printCharacter\n" +
            "xor eax, eax\n" +
            "MOV eax, byte [min]\n" +
            "call printNumber \n" +
            "mov al, 0x3A ; ':'\n" +
            "call printCharacter\n" +
            "xor eax, eax\n" +
            "MOV eax, byte [second]\n" +
            "call printNumber \n" +
            "\n" +
            "END\n" +
            "\n" +
            "; https://stackoverflow.com/a/13523734\n" +
            "; Answer by: Brendan\n" +
            "printNumber:\n" +
            "push eax\n" +
            "push edx\n" +
            "xor edx, edx; edx: eax = number\n" +
            "div dword[const10]; eax = quotient, edx = remainder\n" +
            "test eax, eax; Is quotient zero ?\n" +
            "    je .l1               ; yes, don't display it\n" +
            "call printNumber; Display the quotient\n" +
            "    .l1:\n" +
            "lea eax, edx + 0x30\n" +
            "call printCharacter; Display the remainder\n" +
            "pop edx\n" +
            "pop eax\n" +
            "ret\n" +
            "\n" +
            "printCharacter:\n" +
            "mov dl, al\n" +
            "mov ah, 0x02\n" +
            "int 0x21\n" +
            "ret\n" +
            ""
    },
    {
        Title: "xTEA Encryption",
        Code: "; XTEA (eXtended TEA)\n" +
            "; Converted to Assembly from https://en.wikipedia.org/wiki/XTEA\n" +
            "; Like TEA, XTEA is a 64 - bit block Feistel cipher with a 128 - bit key and a suggested 64 rounds.\n" +
            "; converted to Assembly by Tyler Grusendorf(With the help of Visual Studio Assembly view...)\n" +
            "\n" +
            ".data\n" +
            "\n" +
            "\tkey db 01h, 02h, 03h, 04h, 05h, 06h, 07h, 08h, 01h, 02h, 03h, 04h, 05h, 06h, 07h, 08h\n" +
            "\tmsg db 'Hey ASM!'; Message to Encrypt.Result is stored here.\n" +
            "\t\n" +
            "\tdelta dd 0; Working variable\n" +
            "\tsum dd 0; Working variable\n" +
            "\t\n" +
            "\tv0 dd 0; Working variable\n" +
            "\tv1 dd 0; Working variable\n" +
            "\t\n" +
            "\ti dd 0; Working variable for loop\n" +
            "\tnum_rounds dd 0; Working variable for loop condition\n" +
            "\t\n" +
            ".code\n" +
            "\t\n" +
            "\t    ; Technically these lea values aren't used.\n" +
            "\t    ; encipher(32, msg, key);\n" +
            "\tlea         r8, [key]\n" +
            "\tlea         rdx, [msg]\n" +
            "\tmov         ecx, 20h\n" +
            "\tcall        encipher\n" +
            "\t    ; decipher(32, msg, key);\n" +
            "\tlea         r8, [key]\n" +
            "\tlea         rdx, [msg]\n" +
            "\tmov         ecx, 20h\n" +
            "\tcall        decipher\n" +
            "\t\n" +
            "END\n" +
            "\n" +
            "encipher PROC\n" +
            "\t; void encipher(unsigned int num_rounds, uint32_t msg[2], uint32_t const key[4]) {\n" +
            "\tmov dword num_rounds, ecx\n" +
            "\n" +
            "\t; unsigned int i;\n" +
            "\t; uint32_t v0 = msg[0], v1 = msg[1], sum = 0, delta = 0x9E3779B9;\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 0\n" +
            "\tmov         rcx, msg\n" +
            "\tmov         eax, rcx + rax; index 0 of v\n" +
            "\tmov         dword v0, [eax]\n" +
            "\t\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 1\n" +
            "\tmov         rcx, msg\n" +
            "\tmov         eax, rcx + rax; index 1 of v\n" +
            "\tmov         dword v1, [eax]\n" +
            "\t\n" +
            "\tmov         dword sum, 0\n" +
            "\tmov         dword delta, 9E3779B9h\n" +
            "\t; for (i = 0; i < num_rounds; i++) {\n" +
            "\tmov         dword i, 0\n" +
            "\tjmp         forloop_num_rounds_skip_inc; encipher + 8Ch(07FF70911197Ch)\n" +
            "\t;\n" +
            "forloop_num_rounds:\n" +
            "\tmov         eax, dword[i]\n" +
            "\tinc         eax\n" +
            "\tmov         dword i, eax\n" +
            "forloop_num_rounds_skip_inc:\n" +
            "\tmov         eax, dword[num_rounds]\n" +
            "\tcmp         dword[i], eax\n" +
            "\tjae         exit_loop\n" +
            "\t; v0 += (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + key[sum & 3]);\n" +
            "\tmov         eax, dword[v1]\n" +
            "\tshl         eax, 4\n" +
            "\tmov         ecx, dword[v1]\n" +
            "\tshr         ecx, 5\n" +
            "\txor         eax, ecx\n" +
            "\tadd         eax, dword[v1]\n" +
            "\tmov         ecx, dword[sum]\n" +
            "\tand         ecx, 3\n" +
            "\tmov         rdx, qword key\n" +
            "\tmov         ecx, dword[rdx + rcx * 4]\n" +
            "\tmov         edx, dword[sum]\n" +
            "\tadd         ecx, edx\n" +
            "\txor         eax, ecx\n" +
            "\tmov         ecx, dword[v0]\n" +
            "\tadd         eax, ecx\n" +
            "\tmov         dword v0, eax\n" +
            "\t; sum += delta;\n" +
            "\tmov         eax, dword[delta]\n" +
            "\tmov         ecx, dword[sum]\n" +
            "\tadd         eax, ecx\n" +
            "\tmov         dword sum, eax\n" +
            "\t; v1 += (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum >> 11) & 3]);\n" +
            "\tmov         eax, dword[v0]\n" +
            "\tshl         eax, 4\n" +
            "\tmov         ecx, dword[v0]\n" +
            "\tshr         ecx, 5\n" +
            "\txor         eax, ecx\n" +
            "\tadd         eax, dword[v0]\n" +
            "\tmov         ecx, dword[sum]\n" +
            "\tshr         ecx, 0Bh\n" +
            "\tand         ecx, 3\n" +
            "\tmov         rdx, qword key\n" +
            "\tmov         ecx, dword[rdx + rcx * 4]\n" +
            "\tmov         edx, dword[sum]\n" +
            "\tadd         ecx, edx\n" +
            "\txor         eax, ecx\n" +
            "\tmov         ecx, dword[v1]\n" +
            "\tadd         eax, ecx\n" +
            "\tmov         dword v1, eax\n" +
            "\t;}\n" +
            "\tjmp         forloop_num_rounds\n" +
            "\t; msg[0] = v0; msg[1] = v1;\n" +
            "exit_loop:\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 0\n" +
            "\tmov         rcx, dword msg\n" +
            "\tmov         edx, dword[v0]\n" +
            "\tmov         dword ptr[rcx + rax], edx\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 1\n" +
            "\tmov         rcx, msg\n" +
            "\tmov         edx, dword[v1]\n" +
            "\tmov         dword ptr[rcx + rax], edx\n" +
            "\t;}\n" +
            "\tret\n" +
            "\tencipher ENDP\n" +
            "\t\n" +
            "\t\n" +
            "decipher PROC\n" +
            "\t; void decipher(unsigned int num_rounds, uint32_t msg[2], uint32_t const key[4]) {\n" +
            "\tmov dword num_rounds, ecx\n" +
            "\t; unsigned int i;\n" +
            "\t; uint32_t v0 = msg[0], v1 = msg[1], delta = 0x9E3779B9, sum = delta * num_rounds;\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 0\n" +
            "\tmov         rcx, qword msg\n" +
            "\tmov         eax, dword rcx + rax\n" +
            "\tmov         dword v0, [eax]\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 1\n" +
            "\tmov         rcx, qword msg\n" +
            "\tmov         eax, dword rcx + rax\n" +
            "\tmov         dword v1, [eax]\n" +
            "\tmov         dword delta, 9E3779B9h\n" +
            "\tmov         eax, dword[delta]\n" +
            "\timul        eax, dword[num_rounds]\n" +
            "\tmov         dword sum, eax\n" +
            "\t; for (i = 0; i < num_rounds; i++) {\n" +
            "\tmov         dword i, 0\n" +
            "\tjmp         forloop_num_rounds_skip_inc_dec\n" +
            "forloop_num_rounds_dec:\n" +
            "\tmov         eax, dword[i]\n" +
            "\tinc         eax\n" +
            "\tmov         dword i, eax\n" +
            "forloop_num_rounds_skip_inc_dec:\n" +
            "\tmov         eax, dword[num_rounds]\n" +
            "\tcmp         dword[i], eax\n" +
            "\tjae         exit_loop_dec\n" +
            "\t; v1 -= (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum >> 11) & 3]);\n" +
            "\tmov         eax, dword[v0]\n" +
            "\tshl         eax, 4; (v0 << 4)\n" +
            "\tmov         ecx, dword[v0]\n" +
            "\tshr         ecx, 5; (v0 >> 5)\n" +
            "\txor         eax, ecx; (v0 << 4) ^ (v0 >> 5)\n" +
            "\tadd         eax, dword[v0]; ((v0 << 4) ^ (v0 >> 5)) + v0\n" +
            "\t\n" +
            "\tmov         ecx, dword[sum]\n" +
            "\tshr         ecx, 0Bh; (sum >> 11)\n" +
            "\tand         ecx, 3; (sum >> 11) & 3\n" +
            "\tmov         rdx, qword key\n" +
            "\tmov         ecx, dword[rdx + rcx * 4]; key[(sum >> 11) & 3]\n" +
            "\tmov         edx, dword[sum]\n" +
            "\tadd         ecx, edx; (sum + key[(sum >> 11) & 3])\n" +
            "\txor         eax, ecx; ((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum >> 11) & 3])\n" +
            "\tmov         ecx, dword[v1]\n" +
            "\tsub         ecx, eax\n" +
            "\tmov         dword v1, ecx\n" +
            "\t; sum -= delta;\n" +
            "\tmov         eax, dword[delta]\n" +
            "\tmov         ecx, dword[sum]\n" +
            "\tsub         ecx, eax\n" +
            "\tmov         dword sum, ecx\n" +
            "\t; v0 -= (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + key[sum & 3]);\n" +
            "\tmov         eax, dword[v1]\n" +
            "\tshl         eax, 4; (v1 << 4)\n" +
            "\tmov         ecx, dword[v1]\n" +
            "\tshr         ecx, 5; (v1 >> 5)\n" +
            "\txor         eax, ecx; (v1 << 4) ^ (v1 >> 5)\n" +
            "\tadd         eax, dword[v1]; (((v1 << 4) ^ (v1 >> 5)) + v1)\n" +
            "\tmov         ecx, dword[sum]\n" +
            "\tand         ecx, 3; sum & 3\n" +
            "\tmov         rdx, qword key\n" +
            "\tmov         ecx, dword[rdx + rcx * 4]; key[sum & 3]\n" +
            "\tmov         edx, dword[sum]\n" +
            "\tadd         ecx, edx; (sum + key[sum & 3])\n" +
            "\txor         eax, ecx; (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + key[sum & 3])\n" +
            "\tmov         ecx, dword[v0]\n" +
            "\tsub         ecx, eax\n" +
            "\tmov         dword v0, ecx\n" +
            "\t;}\n" +
            "\tjmp         forloop_num_rounds_dec\n" +
            "\t; msg[0] = v0; msg[1] = v1;\n" +
            "exit_loop_dec:\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 0\n" +
            "\tmov         rcx, qword msg\n" +
            "\tmov         edx, dword[v0]\n" +
            "\tmov         dword rcx + rax, edx\n" +
            "\tmov         eax, 4\n" +
            "\timul        rax, rax, 1\n" +
            "\tmov         rcx, qword msg\n" +
            "\tmov         edx, dword[v1]\n" +
            "\tmov         dword rcx + rax, edx\n" +
            "\t;}\n" +
            "\tret\n" +
            "decipher ENDP"
    },
    {
        Title: "The DUP operation",
        Description: "",
        Code: ";https://www.tech-recipes.com/rx/1258/assembly-dup-command-masmtasm/\n" +
            ";Thanks to William_Wilson for a good explination of the DUP command.\n" + 
            "\n" + 
            "\n" + 
            ".data\n" +
            "\t\n" +
            "\tdelta dd ?\n" +
            "\tv0 dd 0\n" +
            "\tv1 dd ?\n" +
            "\ttext DB 10 DUP('W');initializes 20 bytes to W\n" +
            "\trandom DB 10 DUP(?);initializes 20 bytes to W\n" +
            "\t\n" +
            "\tbarCode DB 4 DUP(3 DUP ('l'), 2 DUP('|'), 5 DUP('I'))\n" +
            "\t\n" +
            ".code\n" +
            "\t\n" +
            "\tnop\n" +
            "\tEND"
    }
];