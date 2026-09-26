var canvasDisplay = null;
var instream = "";
var lastChar = 0;
var bgColour = "black";
var textColour = "white";

var cursorPos = { X: 0, Y: 1 };

function addInterruptHandlers(program, canvas) {
    program.SetInterrupt(0x05, handlePrintScreenInterrupt);
    program.SetInterrupt(0x10, handleVideoInterrupt);
    program.SetInterrupt(0x18, handleDisklessBootHook);
    program.SetInterrupt(0x21, handleDOSInterrupt);

    cursorPos = { X: 0, Y: 1 };
    canvasDisplay = canvas;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    $(canvasDisplay).unbind();
    $(canvasDisplay).bind("keypress", function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        instream += String.fromCharCode(e.keyCode);
    });
}

function handleDisklessBootHook(program) {
    program.End;
    alert("DISKLESS BOOT HOOK called. Program Terminated.");
}

function handlePrintScreenInterrupt(program) {
    var d = $("<div>Screenshot " + new Date().toISOString() + ":<br /></div");
    var href = $("<img src='#' />");
    href.prop("src", canvasDisplay.toDataURL("image/png"));
    d.click(function () { href.toggle("slow"); });
    
    d.append(href);
    $("#message").append(d);
    $("#message").append("<br />");

}

function handleVideoInterrupt(program) {
}

function handleDOSInterrupt(program) {
            var c = 0;
    switch (program.Regs.A.H.getLowBits()) {
        case 0x0: //Program terminate	1.0 +
        case 0x4C: //Terminate with return code	2.0 +
            program.End = true;
            break;
        case 0x1:  //Character input	1.0 +
        case 0x03: //Auxiliary input	1.0 +
            CharInWithEchoReturn(program);
            break;
        case 0x02: //Character output	1.0 +
        case 0x05: //Printer output	1.0 +
        case 0x04: //Auxiliary output	1.0 +
            program.Regs.A.L = new Long(lastChar);
            lastChar = String.fromCharCode(program.Regs.D.L.getLowBits());
            writeChar(canvasDisplay, lastChar);
            break;
        case 0x06: //Direct console I / O	1.0 +
        case 0x07: //Direct console input without echo	1.0 +
        case 0x08: //Console input without echo	1.0 +
            CharInReturn(program);
            break;
        case 0x09: //Display string	1.0 +

            var addr = program.Regs.D.X;
            var msg = program.Mem.ReadString(addr, '$');

            for (var i = 0; i < msg.length; i++)
                writeChar(canvasDisplay, msg[i]);

            program.Regs.A.L = new Long(0x24);
            break;
        case 0x0A: //Buffered keyboard input	1.0 +
        case 0x0B: //Get input status	1.0 +
        case 0x0C: //Flush input buffer and input	1.0 +
        case 0x0D: //Disk reset	1.0 +
        case 0x0E: //Set default drive	1.0 +
        case 0x0F: //Open file	1.0 +
        case 0x10: //Close file	1.0 +
        case 0x11: //Find first file	1.0 +
        case 0x12: //Find next file	1.0 +
        case 0x13: //Delete file	1.0 +
        case 0x14: //Sequential read	1.0 +
        case 0x15: //Sequential write	1.0 +
        case 0x16: //Create or truncate file	1.0 +
        case 0x17: //Rename file	1.0 +
        case 0x18: //Reserved	1.0 +
        case 0x19: //Get default drive	1.0 +
        case 0x1A: //Set disk transfer address	1.0 +
        case 0x1B: //Get allocation info for default drive	1.0 +
        case 0x1C: //Get allocation info for specified drive	1.0 +
        case 0x1D: //Reserved	1.0 +
        case 0x1E: //Reserved	1.0 +
        case 0x1F: //Get disk parameter block for default drive	1.0 +
        case 0x20: //Reserved	1.0 +
        case 0x21: //Random read	1.0 +
        case 0x22: //Random write	1.0 +
        case 0x23: //Get file size in records	1.0 +
        case 0x24: //Set random record number	1.0 +
        case 0x25: //Set interrupt vector	1.0 +
        case 0x26: //Create PSP	1.0 +
        case 0x27: //Random block read	1.0 +
        case 0x28: //Random block write	1.0 +
        case 0x29: //Parse filename	1.0 +
            throw new Error("Interrupt 0x21 - " + toPaddedHexString(program.Regs.A.H.getLowBits(), 2));
        case 0x2A: //Get date	1.0 +
            /*
                CX = year (1980-2099)
                DH = month
                DL = day
                ---DOS 1.10+---
                AL = day of week (00h=Sunday)
            */
            var date2A = new Date();

            program.Regs.C.X = new Long( date2A.getFullYear());
            program.Regs.D.H = new Long(date2A.getMonth());
            program.Regs.D.L = new Long(date2A.getDate());
            program.Regs.A.L = new Long(date2A.getDay());
            break;
        case 0x2B: //Set date	1.0 +
            break;
        case 0x2C: //Get time	1.0 +
            /*
                CH = hour
                CL = minute
                DH = second
                DL = 1/100 seconds
            */
            var date2C = new Date();
            program.Regs.C.H = new Long(date2C.getHours());
            program.Regs.C.L = new Long(date2C.getMinutes());
            program.Regs.D.H = new Long(date2C.getSeconds());
            program.Regs.D.L = new Long(date2C.setMilliseconds() / 100);
            break;
        case 0x2D: //Set time	1.0 +
        case 0x2E: //Set verify flag	1.0 +
        case 0x2F: //Get disk transfer address	2.0 +
        case 0x30: //Get DOS version	2.0 +
        case 0x31: //Terminate and stay resident	2.0 +
        case 0x32: //Get disk parameter block for specified drive	2.0 +
        case 0x33: //Get or set Ctrl - Break	2.0 +
        case 0x34: //Get InDOS flag pointer	2.0 +
        case 0x35: //Get interrupt vector	2.0 +
        case 0x36: //Get free disk space	2.0 +
        case 0x37: //Get or set switch character	2.0 +
        case 0x38: //Get or set country info	2.0 +
        case 0x39: //Create subdirectory	2.0 +
        case 0x3A: //Remove subdirectory	2.0 +
        case 0x3B: //Change current directory	2.0 +
        case 0x3C: //Create or truncate file	2.0 +
        case 0x3D: //Open file	2.0 +
        case 0x3E: //Close file	2.0 +
        case 0x3F: //Read file or device	2.0 +
        case 0x40: //Write file or device	2.0 +
        case 0x41: //Delete file	2.0 +
        case 0x42: //Move file pointer	2.0 +
        case 0x43: //Get or set file attributes	2.0 +
        case 0x44: //I / O control for devices	2.0 +
        case 0x45: //Duplicate handle	2.0 +
        case 0x46: //Redirect handle	2.0 +
        case 0x47: //Get current directory	2.0 +
        case 0x48: //Allocate memory	2.0 +
        case 0x49: //Release memory	2.0 +
        case 0x4A: //Reallocate memory	2.0 +
        case 0x4B: //Execute program	2.0 +
        case 0x4D: //Get program return code	2.0 +
        case 0x4E: //Find first file	2.0 +
        case 0x4F: //Find next file	2.0 +
        case 0x50: //Set current PSP	2.0 +
        case 0x51: //Get current PSP	2.0 +
        case 0x52: //Get DOS internal pointers(SYSVARS)	2.0 +
        case 0x53: //Create disk parameter block	2.0 +
        case 0x54: //Get verify flag	2.0 +
        case 0x55: //Create program PSP	2.0 +
        case 0x56: //Rename file	2.0 +
        case 0x57: //Get or set file date and time	2.0 +
        case 0x58: //Get or set allocation strategy	2.11 +
        case 0x59: //Get extended error info	3.0 +
        case 0x5A: //Create unique file	3.0 +
        case 0x5B: //Create new file	3.0 +
        case 0x5C: //Lock or unlock file	3.0 +
        case 0x5D: //File sharing functions	3.0 +
        case 0x5E: //Network functions	3.0 +
        case 0x5F: //Network redirection functions	3.0 +
        case 0x60: //Qualify filename	3.0 +
        case 0x61: //Reserved	3.0 +
        case 0x62: //Get current PSP	3.0 +
        case 0x63: //Get DBCS lead byte table pointer	3.0 +
        case 0x64: //Set wait for external event flag	3.2 +
        case 0x65: //Get extended country info	3.3 +
        case 0x66: //Get or set code page	3.3 +
        case 0x67: //Set handle count	3.3 +
        case 0x68: //Commit file	3.3 +
        case 0x69: //Get or set media id	4.0 +
        case 0x6A: //Commit file	4.0 +
        case 0x6B: //Reserved	4.0 +
        case 0x6C: //Extended open / create file	4.0 +
        default:
            throw new Error("Interrupt 0x21 - " + toPaddedHexString(program.Regs.A.H.getLowBits(), 2));
    }
}

function CharInWithEchoReturn(program) {
    var c;
    if (instream.length > 0) {
        c = instream.charCodeAt(0);
        instream = instream.substr(1);
    }
    else {
        program.WaitResult = CharInWithEchoReturn;
        WaitForInput(program);
        return;
    }

    writeChar(canvasDisplay, String.fromCharCode(c));
    program.Regs.A.L = new Long(c);
}

function CharInReturn(program) {
    var c;
    if (instream.length > 0) {
        c = instream.charCodeAt(0);
        instream = instream.substr(1);
    }
    else {
        program.WaitResult = CharInReturn;
        WaitForInput(program);
        return;
    }
    
    program.Regs.A.L = new Long(c);
}

function WaitForInput(program) {
    if (instream.length === 0) {
        program.IsWaiting = true;
        setTimeout(WaitForInput, 1, program);
    }
    else {
        program.IsWaiting = false;
        program.WaitResult(program);
    }
}


function writeChar(canvas, char) {
    var regex = /^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i;
    var ctx = canvas.getContext('2d');

    if (char === '\r') {
        cursorPos.X = 0;
    }
    else if (char === '\n') {
        cursorPos.X = 0;
        cursorPos.Y++;
    }
    else if (char === '\t') {
        cursorPos.X += 4;
    }
    if (!regex.test(char)) {
        return; //Ignore unprintable characters.
    }
    else {

        ctx.textBaseline = "bottom";
        ctx.font = "14px Terminal";

        ctx.fillStyle = textColour;
        ctx.fillText(char, cursorPos.X * 9, cursorPos.Y * 14);

        //"80x25 characters" mode is actually 720x350 pixels (meaning that each character cell is 9 pixels wide by 14 pixels high)

        cursorPos.X++;
    }

    if (cursorPos.X >= 80) {
        cursorPos.X = 0;
        cursorPos.Y++;
    }
    if (cursorPos.Y >= 25) {
        cursorPos.Y = 24;

        var savedData = new Image();
        savedData.onload = function () {
            ctx.drawImage(savedData, 0, -14);
        };

        savedData.src = canvas.toDataURL("image/png"); //ctx.getImageData(0, 0, canvas.width, canvas.height); //
        ctx.fillStyle = bgColour;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(savedData.src, 0, -14);
    }
}
