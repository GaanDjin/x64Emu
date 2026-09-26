function trunc(v: number): number {
    return v < 0 ? Math.ceil(v) : Math.floor(v);
}

function StringToNumberArray(Value: string) : Long[]{
    var arr: Long[] = [];
    for (var i = 0; i < Value.length; i++) {
        arr.push(new Long(Value.charCodeAt(i)));
    }
    return arr;
}

function toPaddedHexString(num: number, len: number): string {

    if (num === null || len === null)
        return "";

    var isNeg = num < 0;

    if (isNeg)
        num = twos_complement(num, len * 4);

    switch (len) {
        case 1:
            num = num & 0xFF;
            break;
        case 2:
            num = num & 0xFFFF;
            break;
        case 4:
            num = num & 0xFFFFFFFF;
            break;
    }

    var str = num.toString(16).toUpperCase();
    var result: string = "";

    for (var i = 0; i < len - str.length; i++) {

        if (isNeg)
            result += "F";
        else
            result += "0";
    }
    return (result + str).substr(0, len);
}

function twos_complement(input_value: number, num_bits: number): number
{
    //Calculates a two's complement integer from the given input value's bits'''
    var mask = Math.pow(2, (num_bits - 1));
    return -(input_value & mask) + (input_value & ~mask)
}


class Long {
    /**
     * https://github.com/dcodeIO/long.js
     */
    private __isLong__: boolean = true;
    private high: number
    private low: number
    private unsigned: boolean

    /** Set to true if the result of a calcualtion (Like add) is larger than 64-bits. Used to set OF flag. */
    public overflow: boolean

    ///Not actually... but we had to give it a type. Until typescript is and WebAssembly play nicy nice. 
    private static wasm: { [index: string]: Function; } = null;
    //private static skipwasmChecked = true;

    //private static checkWASM() {
    //    Long.skipwasmChecked = false;
    //    try {
    //        Long.wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    //            0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
    //        ])), {}).exports;
    //    } catch (e) {
    //        // no wasm support :(
    //    }
    //}

    constructor(low: number, high: number = 0, unsigned: boolean = true) {
        //if (Long.skipwasmChecked)
        //    Long.checkWASM();


        /**
         * The low 32 bits as a signed value.
         * @type {number}
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         */
        this.unsigned = !!unsigned;
    }

    ///**
    // * A cache of the Long representations of small integer values.
    // * @type {!Object}
    // * @inner
    // */
    private static INT_CACHE: Long[] = [];

    ///**
    // * A cache of the Long representations of small unsigned integer values.
    // * @type {!Object}
    // * @inner
    // */
    private static UINT_CACHE: Long[] = [];

    public static fromInt(value: number, unsigned: boolean = true): Long {
        /**
         * Returns a Long representing the given 32 bit integer value.
         * @function
         * @param {number} value The 32 bit integer in question
         * @param {boolean} unsigned Whether unsigned or not, defaults to signed
         * @returns {!Long} The corresponding Long value
        */

        if (value == 0)
            return new Long(0, 0, unsigned);

        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = Long.UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = Long.fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                Long.UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = Long.INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = Long.fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                Long.INT_CACHE[value] = obj;
            return obj;
        }
    }

    public static fromNumber(value: number, unsigned: boolean = true): Long {
        /**
         * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
         * @function
         * @param {number} value The number in question
         * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
         * @returns {!Long} The corresponding Long value
         */
        if (isNaN(value))
            return unsigned ? Long.UZERO.copy() : Long.ZERO.copy();
        if (unsigned) {
            if (value < 0)
                return Long.UZERO.copy();
            if (value >= Long.TWO_PWR_64_DBL)
                return Long.MAX_UNSIGNED_VALUE.copy();
        } else {
            if (value <= -Long.TWO_PWR_63_DBL)
                return Long.MIN_VALUE.copy();
            if (value + 1 >= Long.TWO_PWR_63_DBL)
                return Long.MAX_VALUE.copy();
        }
        if (value < 0)
            return Long.fromNumber(-value, unsigned).negate();
        return Long.fromBits((value % Long.TWO_PWR_32_DBL) | 0, (value / Long.TWO_PWR_32_DBL) | 0, unsigned);
    }

    public static fromBits(lowBits: number, highBits: number, unsigned: boolean = true): Long {
        /**
         * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
         *  assumed to use 32 bits.
         * @function
         * @param {number} lowBits The low 32 bits
         * @param {number} highBits The high 32 bits
         * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
         * @returns {!Long} The corresponding Long value
         */
        return new Long(lowBits, highBits, unsigned);
    }

    static isLong(obj: any): boolean {
        return (obj && obj["__isLong__"]) === true;
    }

    //var Math.pow = Math.pow; // Used 4 times (4*8 to 15+4)

    public static fromString(str: string, unsigned: boolean = true, radix: number = 10): Long {

        /**
         * Returns a Long representation of the given string, written using the specified radix.
         * @function
         * @param {string} str The textual representation of the Long
         * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
         * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
         * @returns {!Long} The corresponding Long value
         */
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return Long.ZERO.copy();
        if (typeof unsigned === 'number') {
            // For goog.math.long compatibility
            radix = unsigned,
                unsigned = false;
        } else {
            unsigned = !!unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return Long.fromString(str.substring(1), unsigned, radix).negate();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Math.pow(radix, 8));

        var result = Long.ZERO.copy();
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = Long.fromNumber(Math.pow(radix, size));
                result = result.multiply(power).add(Long.fromNumber(value));
            } else {
                result = result.multiply(radixToPower);
                result = result.add(Long.fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    public static fromValue(val: Long | number | string, unsigned: boolean = true): Long {
        /**
         * Converts the specified value to a Long using the appropriate from* function for its type.
         * @function
         * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
         * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
         * @returns {!Long}
         */
        if (typeof val === 'number')
            return Long.fromNumber(val, unsigned);
        if (typeof val === 'string')
            return Long.fromString(val, unsigned);
        // Throws for non-objects, converts non-instanceof Long:
        return Long.fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
    }

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.
    
    /**
     * @type {number}
     * @const
     * @inner
     */
    private static TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    private static TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    private static TWO_PWR_32_DBL = Long.TWO_PWR_16_DBL * Long.TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    private static TWO_PWR_64_DBL = Long.TWO_PWR_32_DBL * Long.TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    private static TWO_PWR_63_DBL = Long.TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    private static TWO_PWR_24 = Long.fromInt(Long.TWO_PWR_24_DBL, false);

    /**
     * Signed zero.
     * @type {!Long}
     */
    public static ZERO = Long.fromInt(0, false);

    /**
     * Unsigned zero.
     * @type {!Long}
     */
    public static UZERO = Long.fromInt(0, true);

    /**
     * Signed one.
     * @type {!Long}
     */
    public static ONE = Long.fromInt(1, false);


    /**
     * Unsigned one.
     * @type {!Long}
     */
    public static UONE = Long.fromInt(1, true);

    /**
     * Signed negative one.
     * @type {!Long}
     */
    public static NEG_ONE = Long.fromInt(-1, false);


    /**
     * Maximum signed value.
     * @type {!Long}
     */
    public static MAX_VALUE = Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     */
    public static MAX_UNSIGNED_VALUE = Long.fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);

    /**
     * Minimum signed value.
     * @type {!Long}
     */
    public static MIN_VALUE = Long.fromBits(0, 0x80000000 | 0, false);

    public static UByteEighty = Long.fromBits(0x80, 0, true);
    public static UShortEighty = Long.fromBits(0x8000, 0, true);
    public static UIntEighty = Long.fromBits(0x80000000, 0, true);
    public static ULongEighty = Long.fromBits(0, 0x80000000, true);

    public static UByteMask = Long.fromBits(0xFF, 0, true);
    public static UShortMask = Long.fromBits(0xFFFF, 0, true);
    public static UIntMask = Long.fromBits(0xFFFFFFFF, 0, true);
    public static ULongMask = Long.fromBits(0xFFFFFFFF, 0xFFFFFFFF, true);

    public toInt(): number {
        /**
         * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
         * @this {!Long}
         * @returns {number}
         */
        return this.unsigned ? this.low >>> 0 : this.low;
    }

    public toNumber(): number {
        /**
         * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
         * @this {!Long}
         * @returns {number}
         */
        if (this.unsigned)
            return ((this.high >>> 0) * Long.TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * Long.TWO_PWR_32_DBL + (this.low >>> 0);
    }

    public toString(radix: number = 10): string {
        /**
         * Converts the Long to a string written in the specified radix.
         * @this {!Long}
         * @param {number=} radix Radix (2-36), defaults to 10
         * @returns {string}
         * @override
         * @throws {RangeError} If `radix` is out of range
         */
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.equals(Long.MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = Long.fromNumber(radix),
                    div = this.divide(radixLong),
                    rem1 = div.multiply(radixLong).subtract(this);
                return div.toString(radix) + rem1.toInt().toString(radix).toUpperCase();
            } else
                return '-' + this.negate().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Math.pow(radix, 6), this.unsigned);
        var rem: Long = this;
        var result = '';
        while (true) {
            var remDiv = rem.divide(radixToPower),
                intval = rem.subtract(remDiv.multiply(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return (digits + result).toUpperCase();
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    }

    public getHighBits(): number {
        /**
         * Gets the high 32 bits as a signed integer.
         * @this {!Long}
         * @returns {number} Signed high bits
         */
        return this.high;
    }
    
    public setHighBits(val: number) {
        /**
         * Sets the high 32 bits as a signed integer.
         * @this {!Long}
         * @returns {number} Signed high bits
         */
        this.high = val;
    }

    public getHighBitsUnsigned(): number {
        /**
         * Gets the high 32 bits as an unsigned integer.
         * @this {!Long}
         * @returns {number} Unsigned high bits
         */
        return this.high >>> 0;
    }
    
    public setLowBits(val : number) {
        /**
         * Sets the low 32 bits as a signed integer.
         * @this {!Long}
         * @returns {number} Signed low bits
         */
        this.low = val;
    }

    public maskLowBitsOr(mask: number): Long {
        return new Long(this.low | mask, 0, this.unsigned);
    }

    public maskLowBitsAnd(mask: number): Long {
        return new Long(this.low & mask, 0, this.unsigned);
    }

    public maskLowBitsXor(mask: number): Long {
        return new Long(this.low ^ mask, 0, this.unsigned);
    }

    public maskHighBitsOr(mask: number): Long {
        return new Long(this.high | mask, 0, this.unsigned);
    }

    public maskHighBitsAnd(mask: number): Long {
        return new Long(this.high & mask, 0, this.unsigned);
    }

    public maskHighBitsXor(mask: number): Long {
        return new Long(this.high ^ mask, 0, this.unsigned);
    }

    public getLowBits(): number {
        /**
         * Gets the low 32 bits as a signed integer.
         * @this {!Long}
         * @returns {number} Signed low bits
         */
        return this.low;
    }

    public getLowBitsUnsigned(): number {
        /**
         * Gets the low 32 bits as an unsigned integer.
         * @this {!Long}
         * @returns {number} Unsigned low bits
         */
        return this.low >>> 0;
    }

    public getNumBitsAbs(): number {
        /**
         * Gets the number of bits needed to represent the absolute value of this Long.
         * @this {!Long}
         * @returns {number}
         */
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.equals(Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    }

    public isZero(): boolean {
        /**
         * Tests if this Long's value equals zero.
         * @this {!Long}
         * @returns {boolean}
         */
        return this.high === 0 && this.low === 0;
    }

    public isNegative(): boolean {
        /**
         * Tests if this Long's value is negative.
         * @this {!Long}
         * @returns {boolean}
         */
        return !this.unsigned && this.high < 0;
    }

    public isUnsignedNegative(): boolean {
        /**
         * Tests if this Long's value is negative.
         * @this {!Long}
         * @returns {boolean}
         */
        return (this.high & 0x80000000) == 0x80000000;
    }

    public isPositive(): boolean {
        /**
         * Tests if this Long's value is positive.
         * @this {!Long}
         * @returns {boolean}
         */
        return this.unsigned || this.high >= 0;
    }

    public isOdd(): boolean {
        /**
         * Tests if this Long's value is odd.
         * @this {!Long}
         * @returns {boolean}
         */
        return (this.low & 1) === 1;
    }

    public isEven(): boolean {
        /**
         * Tests if this Long's value is even.
         * @this {!Long}
         * @returns {boolean}
         */
        return (this.low & 1) === 0;
    }

    public equals(other: Long): boolean {
        /**
         * Tests if this Long's value equals the specified's.
         * @this {!Long}
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    }

    public notEquals(other: Long): boolean {
        /**
         * Tests if this Long's value differs from the specified's.
         * @this {!Long}
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        return !this.equals(/* validates */ other);
    }

    public lessThan(other: Long): boolean {
        /**
         * Tests if this Long's value is less than the specified's.
         * @this {!Long}
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        return this.compare(/* validates */ other) < 0;
    }

    public lessThanOrEqual(other: Long): boolean {
        /**
         * Tests if this Long's value is less than or equal the specified's.
         * @this {!Long}
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        return this.compare(/* validates */ other) <= 0;
    }

    public greaterThan(other: Long): boolean {
        /**
         * Tests if this Long's value is greater than the specified's.
         * @this {!Long}
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        return this.compare(/* validates */ other) > 0;
    }

    public greaterThanOrEqual(other: Long) {
        /**
         * Tests if this Long's value is greater than or equal the specified's.
         * @this {!Long}
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        return this.compare(/* validates */ other) >= 0;
    }

    public compare(other: Long): number {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.equals(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.subtract(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    }

    public negate(): Long {
        if (!this.unsigned && this.equals(Long.MIN_VALUE))
            return Long.MIN_VALUE;
        return this.not().add(Long.ONE);
    }

    public add(num: Long): Long {
        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
        var overflow = false;

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = num.high >>> 16;
        var b32 = num.high & 0xFFFF;
        var b16 = num.low >>> 16;
        var b00 = num.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;

        if (c16 > 0xFFFF)
            overflow = true;

        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        var result = Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        result.overflow = overflow;
        return result;
    }

    public subtract(subtrahend: Long): Long {
        //if (typeof (subtrahend) == "number")
        //    subtrahend = Long.fromValue(subtrahend);
        return this.add(subtrahend.negate());
    };

    public increment(): Long {
        //if (typeof (subtrahend) == "number")
        //    subtrahend = Long.fromValue(subtrahend);
        return this.add(Long.ONE);
    };

    public decrement(): Long {
        //if (typeof (subtrahend) == "number")
        //    subtrahend = Long.fromValue(subtrahend);
        return this.subtract(Long.ONE);
    };


    public multiply(multiplier: Long): Long {
        if (this.isZero())
            return Long.ZERO.copy();
        //if (!Long.isLong(multiplier))
        //    multiplier = Long.fromValue(multiplier);

        // use wasm support if present
        if (Long.wasm) {
            var low = Long.wasm["mul"](this.low,
                this.high,
                multiplier.low,
                multiplier.high);
            return Long.fromBits(low, Long.wasm["get_high"](), this.unsigned);
        }

        if (multiplier.isZero())
            return Long.ZERO.copy();
        if (this.equals(Long.MIN_VALUE))
            return multiplier.isOdd() ? Long.MIN_VALUE.copy() : Long.ZERO.copy();
        if (multiplier.equals(Long.MIN_VALUE))
            return this.isOdd() ? Long.MIN_VALUE.copy() : Long.ZERO.copy();

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.negate().multiply(multiplier.negate());
            else
                return this.negate().multiply(multiplier).negate();
        } else if (multiplier.isNegative())
            return this.multiply(multiplier.negate()).negate();

        // If both longs are small, use float multiplication
        if (this.lessThan(Long.TWO_PWR_24) && multiplier.lessThan(Long.TWO_PWR_24))
            return Long.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.
        var overflow = false;

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        
        if (c16 > 0xFFFF)
            overflow = true;

        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        var result = Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        result.overflow = overflow;
        return result;
    };

    public divide(divisor: Long): Long {
        //if (!Long.isLong(divisor))
        //    divisor = Long.fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');

        // use wasm support if present
        if (Long.wasm) {
            // guard against signed division overflow: the largest
            // negative number / -1 would be 1 larger than the largest
            // positive number, due to two's complement.
            if (!this.unsigned &&
                this.high === -0x80000000 &&
                divisor.low === -1 && divisor.high === -1) {
                // be consistent with non-wasm code path
                return this;
            }
            var low = (this.unsigned ? Long.wasm["div_u"] : Long.wasm["div_s"])(
                this.low,
                this.high,
                divisor.low,
                divisor.high
            );
            return Long.fromBits(low, Long.wasm["get_high"](), this.unsigned);
        }

        if (this.isZero())
            return this.unsigned ? Long.UZERO.copy() : Long.ZERO.copy();
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.equals(Long.MIN_VALUE)) {
                if (divisor.equals(Long.ONE) || divisor.equals(Long.NEG_ONE))
                    return Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.equals(Long.MIN_VALUE))
                    return Long.ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shiftRight(1);
                    approx = halfThis.divide(divisor).shiftLeft(1);
                    if (approx.equals(Long.ZERO)) {
                        return divisor.isNegative() ? Long.ONE : Long.NEG_ONE;
                    } else {
                        rem = this.subtract(divisor.multiply(approx));
                        res = approx.add(rem.divide(divisor));
                        return res;
                    }
                }
            } else if (divisor.equals(Long.MIN_VALUE))
                return this.unsigned ? Long.UZERO.copy() : Long.ZERO.copy();
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.negate().divide(divisor.negate());
                return this.negate().divide(divisor).negate();
            } else if (divisor.isNegative())
                return this.divide(divisor.negate()).negate();
            res = Long.ZERO.copy();
        } else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.greaterThan(this))
                return Long.UZERO;
            if (divisor.greaterThan(this.shiftRightUnsigned(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return Long.UONE;
            res = Long.UZERO;
        }

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.greaterThanOrEqual(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48),

                // Decrease the approximation until it is smaller than the remainder.  Note
                // that if it is too large, the product overflows and is negative.
                approxRes = Long.fromNumber(approx),
                approxRem = approxRes.multiply(divisor);
            while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
                approx -= delta;
                approxRes = Long.fromNumber(approx, this.unsigned);
                approxRem = approxRes.multiply(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = Long.ONE;

            res = res.add(approxRes);
            rem = rem.subtract(approxRem);
        }
        return res;
    };

    public modulo(divisor: Long) {
        //if (!isLong(divisor))
        //    divisor = Long.fromValue(divisor);

        // use wasm support if present
        if (Long.wasm) {
            var low = (this.unsigned ? Long.wasm["rem_u"] : Long.wasm["rem_s"])(
                this.low,
                this.high,
                divisor.low,
                divisor.high
            );
            return Long.fromBits(low, Long.wasm["get_high"](), this.unsigned);
        }

        return this.subtract(this.divide(divisor).multiply(divisor));
    };

    public not(): Long {
        return Long.fromBits(~this.low, ~this.high, this.unsigned);
    };

    public and(other: Long): Long {
        //if (!isLong(other))
        //    other = Long.fromValue(other);
        return Long.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    public or(other: Long): Long {
        //if (!isLong(other))
        //    other = Long.fromValue(other);
        return Long.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    public xor(other: Long): Long {
        //if (!isLong(other))
        //    other = Long.fromValue(other);
        return Long.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    public shiftLeft(numBits: number): Long {
        //if (isLong(numBits))
        //    numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return Long.fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    public shiftRight(numBits: number): Long {
        //if (isLong(numBits))
        //    numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return Long.fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };


    public shiftRightUnsigned(numBits: number): Long {
        //if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        if (numBits < 32) return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >>> numBits, this.unsigned);
        if (numBits === 32) return Long.fromBits(this.high, 0, this.unsigned);
        return Long.fromBits(this.high >>> (numBits - 32), 0, this.unsigned);
    };


    public rotateLeft(numBits: number): Long {
        var b;
        //if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        if (numBits === 32) return Long.fromBits(this.high, this.low, this.unsigned);
        if (numBits < 32) {
            b = (32 - numBits);
            return Long.fromBits(((this.low << numBits) | (this.high >>> b)), ((this.high << numBits) | (this.low >>> b)), this.unsigned);
        }
        numBits -= 32;
        b = (32 - numBits);
        return Long.fromBits(((this.high << numBits) | (this.low >>> b)), ((this.low << numBits) | (this.high >>> b)), this.unsigned);
    }

    public rotateRight(numBits: number): Long {
        var b;
        //if (isLong(numBits)) numBits = numBits.toInt();
        if ((numBits &= 63) === 0) return this;
        if (numBits === 32) return Long.fromBits(this.high, this.low, this.unsigned);
        if (numBits < 32) {
            b = (32 - numBits);
            return Long.fromBits(((this.high << b) | (this.low >>> numBits)), ((this.low << b) | (this.high >>> numBits)), this.unsigned);
        }
        numBits -= 32;
        b = (32 - numBits);
        return Long.fromBits(((this.low << b) | (this.high >>> numBits)), ((this.high << b) | (this.low >>> numBits)), this.unsigned);
    }

    public toSigned() {
        if (!this.unsigned)
            return this;
        return Long.fromBits(this.low, this.high, false);
    };

    public toUnsigned() {
        if (this.unsigned)
            return this;
        return Long.fromBits(this.low, this.high, true);
    };

    public toBytes(le: boolean = false): number[] {
        return le ? this.toBytesLE() : this.toBytesBE();
    };

    public toBytesLE(): number[] {
        /**
      * Converts this Long to its little endian byte representation.
      * @this {!Long}
      * @returns {!Array.<number>} Little endian byte representation
      */
        var hi = this.high,
            lo = this.low;
        return [
            lo & 0xff,
            lo >>> 8 & 0xff,
            lo >>> 16 & 0xff,
            lo >>> 24,
            hi & 0xff,
            hi >>> 8 & 0xff,
            hi >>> 16 & 0xff,
            hi >>> 24
        ];
    }

    public toBytesBE(): number[] {
        /**
         * Converts this Long to its big endian byte representation.
         * @this {!Long}
         * @returns {!Array.<number>} Big endian byte representation
         */
        var hi = this.high,
            lo = this.low;
        return [
            hi >>> 24,
            hi >>> 16 & 0xff,
            hi >>> 8 & 0xff,
            hi & 0xff,
            lo >>> 24,
            lo >>> 16 & 0xff,
            lo >>> 8 & 0xff,
            lo & 0xff
        ];
    }

    public static fromBytes(bytes: number[], unsigned: boolean = false, le: boolean = false): Long {
        return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
    };

    public static fromBytesLE(bytes: number[], unsigned: boolean = false): Long {
        /**
         * Creates a Long from its little endian byte representation.
         * @param {!Array.<number>} bytes Little endian byte representation
         * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
         * @returns {Long} The corresponding Long value
         */
        return new Long(
            bytes[0] |
            bytes[1] << 8 |
            bytes[2] << 16 |
            bytes[3] << 24,
            bytes[4] |
            bytes[5] << 8 |
            bytes[6] << 16 |
            bytes[7] << 24,
            unsigned
        );
    }

    public static fromBytesBE(bytes: number[], unsigned: boolean = false): Long {
        return new Long(
            bytes[4] << 24 |
            bytes[5] << 16 |
            bytes[6] << 8 |
            bytes[7],
            bytes[0] << 24 |
            bytes[1] << 16 |
            bytes[2] << 8 |
            bytes[3],
            unsigned
        );
    }

    public copy(): Long {
        var c = new Long(this.low, this.high, this.unsigned);
        return c;
    }

    public static LongBinaryMultiply(a: Long, b: Long): Long[] {
        if (a == null || a.equals(Long.ZERO) ||
            b == null || b.equals(Long.ZERO))
            return [Long.ZERO.copy(), Long.ZERO.copy()];

        var abinary = a.toString(2);
        var bbinary = b.toString(2);

        if (abinary.length < bbinary.length) {
            for (var i = abinary.length; i < bbinary.length; i++)
                abinary = "0" + abinary;
        }
        if (bbinary.length < abinary.length) {
            for (var i = bbinary.length; i < abinary.length; i++)
                bbinary = "0" + bbinary;
        }


        var values = [];
        var round = 0;
        for (var i = bbinary.length - 1; i >= 0; i-- , round++) {
            var r = bbinary.charAt(i) == "1" ? true : false;
            var next = "";
            for (var i2 = 0; i2 < abinary.length; i2++) {
                var m = abinary.charAt(i2) == "1" ? true : false;
                if (r && m)
                    next += "1";
                else
                    next += "0";
            }
            for (var c = 0; c < round; c++)
                next += "0";
            for (var c = 0; c < bbinary.length - round; c++)
                next = "0" + next;

            //result.innerHTML += next.substr(0, 4) + " " + next.substr(4, 4) + " " + next.substr(8, 4) + "<br />";
            if (next.indexOf("1") >= 0)
                values.push(next);
        }
        var numOfBits = next.length;

        var final = "";
        var carry = false;

        var interm = values[0];
        for (var i = 1; i < values.length; i++) {

            var col = carry;
            for (var c = numOfBits - 1; c >= 0; c--) {
                var curr = values[i].charAt(c) + "" + interm.charAt(c);

                switch (curr) {
                    case "00":
                        if (carry)
                            final = "1" + final;
                        else
                            final = "0" + final;
                        carry = false;
                        break;
                    case "01":
                    case "10":
                        if (carry) {
                            final = "0" + final;
                            carry = true;
                        }
                        else {
                            final = "1" + final;
                        }
                        break;
                    case "11":
                        if (carry)
                            final = "1" + final;
                        else
                            final = "0" + final;
                        carry = true;
                        break;
                }
            }
            interm = final;
        }

        if (final.length == 0)
            final = interm;

        var high;
        var low;

        if (final.length > 64) {
            high = Long.fromString(final.substr(0, final.length - 64), true, 2);
            low = Long.fromString(final.substr(final.length - 64), true, 2);
        }
        else {
            high = Long.ZERO.copy();
            low = Long.fromString(final, true, 2);
        }
        return [high, low];
    }
}

class Registers {
    A: GeneralPurposeRegister;
    B: GeneralPurposeRegister;
    C: GeneralPurposeRegister;
    D: GeneralPurposeRegister;
    BP: GeneralPurposeRegister;
    SI: GeneralPurposeRegister;
    DI: GeneralPurposeRegister;

    //Stack Pointer
    SP: GeneralPurposeRegister;
    //* Points to the next instruction to be executed. *//
    IP: GeneralPurposeRegister;

    R8: GeneralPurposeRegister;
    R9: GeneralPurposeRegister;
    R10: GeneralPurposeRegister;
    R11: GeneralPurposeRegister;
    R12: GeneralPurposeRegister;
    R13: GeneralPurposeRegister;
    R14: GeneralPurposeRegister;
    R15: GeneralPurposeRegister;

    RFlags: Flags;

    constructor() {
        this.A = new GeneralPurposeRegister();
        this.A = new GeneralPurposeRegister();
        this.B = new GeneralPurposeRegister();
        this.C = new GeneralPurposeRegister();
        this.D = new GeneralPurposeRegister();
        this.BP = new GeneralPurposeRegister();
        this.SI = new GeneralPurposeRegister();
        this.DI = new GeneralPurposeRegister();
        this.SP = new GeneralPurposeRegister();
        this.IP = new GeneralPurposeRegister();
        this.R8 = new GeneralPurposeRegister();
        this.R9 = new GeneralPurposeRegister();
        this.R10 = new GeneralPurposeRegister();
        this.R11 = new GeneralPurposeRegister();
        this.R12 = new GeneralPurposeRegister();
        this.R13 = new GeneralPurposeRegister();
        this.R14 = new GeneralPurposeRegister();
        this.R15 = new GeneralPurposeRegister();

        this.RFlags = new Flags();
    }
    
    clone(): Registers {
        var newRegs = JSON.parse(JSON.stringify(this));
        return newRegs;
    }

    SetRegister(name: string, value: Long): boolean {
        if (name.charAt(0) == "%")
            name = name.substr(1);
        if (name.charAt(0) == ".")
            name = name.substr(1);

        switch (name.toUpperCase()) {
            case "RAX":
                this.A.R = value;
                return true;
            case "RBX":
                this.B.R = value;
                return true;
            case "RCX":
                this.C.R = value;
                return true;
            case "RDX":
                this.D.R = value;
                return true;
            case "RBP":
                this.BP.R = value;
                return true;
            case "RSI":
                this.SI.R = value;
                return true;
            case "RDI":
                this.DI.R = value;
                return true;
            case "RSP":
                this.SP.R = value;
                return true;
            case "RIP":
                this.IP.R = value;
                return true;

            case "EAX":
                this.A.E = value;
                return true;
            case "EBX":
                this.B.E = value;
                return true;
            case "ECX":
                this.C.E = value;
                return true;
            case "EDX":
                this.D.E = value;
                return true;
            case "EBP":
                this.BP.E = value;
                return true;
            case "ESI":
                this.SI.E = value;
                return true;
            case "EDI":
                this.DI.E = value;
                return true;
            case "ESP":
                this.SP.E = value;
                return true;
            case "EIP":
                this.IP.E = value;
                return true;


            case "AX":
                this.A.X = value;
                return true;
            case "BX":
                this.B.X = value;
                return true;
            case "CX":
                this.C.X = value;
                return true;
            case "DX":
                this.D.X = value;
                return true;
            case "BP":
                this.BP.X = value;
                return true;
            case "SI":
                this.SI.X = value;
                return true;
            case "DI":
                this.DI.X = value;
                return true;
            case "SP":
                this.SP.X = value;
                return true;
            case "IP":
                this.IP.X = value;
                return true;

            case "AL":
                this.A.L = value;
                return true;
            case "BL":
                this.B.L = value;
                return true;
            case "CL":
                this.C.L = value;
                return true;
            case "DL":
                this.D.L = value;
                return true;
            //case "BL":
            //    this.BP.L = value;
            //    break;
            //case "SL":
            //    this.SI.L = value;
            //    break;
            //case "DL":
            //    this.DI.L = value;
            //    break;
            //case "SL":
            //    this.SP.L = value;
            //    break;
            ////case "IL":
            //    this.IP.L = value;
            //    break;
            case "AH":
                this.A.H = value;
                return true;
            case "BH":
                this.B.H = value;
                return true;
            case "CH":
                this.C.H = value;
                return true;
            case "DH":
                this.D.H = value;
                return true;

            case "R8":
                this.R8.R = value;
                return true;
            case "R9":
                this.R9.R = value;
                return true;
            case "R10":
                this.R10.R = value;
                return true;
            case "R11":
                this.R11.R = value;
                return true;
            case "R12":
                this.R12.R = value;
                return true;
            case "R13":
                this.R13.R = value;
                return true;
            case "R14":
                this.R14.R = value;
                return true;
            case "R15":
                this.R15.R = value;
                return true;

            case "R8D":
                this.R8.D = value;
                return true;
            case "R9D":
                this.R9.D = value;
                return true;
            case "R10D":
                this.R10.D = value;
                return true;
            case "R11D":
                this.R11.D = value;
                return true;
            case "R12D":
                this.R12.D = value;
                return true;
            case "R13D":
                this.R13.D = value;
                return true;
            case "R14D":
                this.R14.D = value;
                return true;
            case "R15D":
                this.R15.D = value;
                return true;

            case "R8W":
                this.R8.W = value;
                return true;
            case "R9W":
                this.R9.W = value;
                return true;
            case "R10W":
                this.R10.W = value;
                return true;
            case "R11W":
                this.R11.W = value;
                return true;
            case "R12W":
                this.R12.W = value;
                return true;
            case "R13W":
                this.R13.W = value;
                return true;
            case "R14W":
                this.R14.W = value;
                return true;
            case "R15W":
                this.R15.W = value;
                return true;

            case "R8B":
                this.R8.B = value;
                return true;
            case "R9B":
                this.R9.B = value;
                return true;
            case "R10B":
                this.R10.B = value;
                return true;
            case "R11B":
                this.R11.B = value;
                return true;
            case "R12B":
                this.R12.B = value;
                return true;
            case "R13B":
                this.R13.B = value;
                return true;
            case "R14B":
                this.R14.B = value;
                return true;
            case "R15B":
                this.R15.B = value;
                return true;
        }

        return false;
    }

    GetRegisterValue(name: string): Long {
        if (name.charAt(0) == "%")
            name = name.substr(1);
        if (name.charAt(0) == ".")
            name = name.substr(1);

        switch (name.toUpperCase()) {
            case "RAX":
                return this.A.R;
            case "RBX":
                return this.B.R;
            case "RCX":
                return this.C.R;
            case "RDX":
                return this.D.R;
            case "RBP":
                return this.BP.R;
            case "RSI":
                return this.SI.R;
            case "RDI":
                return this.DI.R;
            case "RSP":
                return this.SP.R;
            case "RIP":
                return this.IP.R;

            case "EAX":
                return this.A.E;
            case "EBX":
                return this.B.E;
            case "ECX":
                return this.C.E;
            case "EDX":
                return this.D.E;
            case "EBP":
                return this.BP.E;
            case "ESI":
                return this.SI.E;
            case "EDI":
                return this.DI.E;
            case "ESP":
                return this.SP.E;
            case "EIP":
                return this.IP.E;


            case "AX":
                return this.A.X;
            case "BX":
                return this.B.X;
            case "CX":
                return this.C.X;
            case "DX":
                return this.D.X;
            case "BP":
                return this.BP.X;
            case "SI":
                return this.SI.X;
            case "DI":
                return this.DI.X;
            case "SP":
                return this.SP.X;
            case "IP":
                return this.IP.X;

            case "AL":
                return this.A.L;
            case "BL":
                return this.B.L;
            case "CL":
                return this.C.L;
            case "DL":
                return this.D.L;
            //case "BL":
            //    this.BP.L = value;
            //    break;
            //case "SL":
            //    this.SI.L = value;
            //    break;
            //case "DL":
            //    this.DI.L = value;
            //    break;
            //case "SL":
            //    this.SP.L = value;
            //    break;
            ////case "IL":
            //    this.IP.L = value;
            //    break;
            case "AH":
                return this.A.H;
            case "BH":
                return this.B.H;
            case "CH":
                return this.C.H;
            case "DH":
                return this.D.H;

            case "R8":
                return this.R8.R;
            case "R9":
                return this.R9.R;
            case "R10":
                return this.R10.R;
            case "R11":
                return this.R11.R;
            case "R12":
                return this.R12.R;
            case "R13":
                return this.R13.R;
            case "R14":
                return this.R14.R;
            case "R15":
                return this.R15.R;

            case "R8D":
                return this.R8.D;
            case "R9D":
                return this.R9.D;
            case "R10D":
                return this.R10.D;
            case "R11D":
                return this.R11.D;
            case "R12D":
                return this.R12.D;
            case "R13D":
                return this.R13.D;
            case "R14D":
                return this.R14.D;
            case "R15D":
                return this.R15.D;

            case "R8W":
                return this.R8.W;
            case "R9W":
                return this.R9.W;
            case "R10W":
                return this.R10.W;
            case "R11W":
                return this.R11.W;
            case "R12W":
                return this.R12.W;
            case "R13W":
                return this.R13.W;
            case "R14W":
                return this.R14.W;
            case "R15W":
                return this.R15.W;

            case "R8B":
                return this.R8.B;
            case "R9B":
                return this.R9.B;
            case "R10B":
                return this.R10.B;
            case "R11B":
                return this.R11.B;
            case "R12B":
                return this.R12.B;
            case "R13B":
                return this.R13.B;
            case "R14B":
                return this.R14.B;
            case "R15B":
                return this.R15.B;
        }

        return Long.ZERO.copy();
    }

    static IsRegister(name: string): boolean {
        if (name.charAt(0) == "%")
            name = name.substr(1);
        if (name.charAt(0) == ".")
            name = name.substr(1);


        switch (name.toUpperCase()) {
            case "RAX":
                return true;
            case "RBX":
                return true;
            case "RCX":
                return true;
            case "RDX":
                return true;
            case "RBP":
                return true;
            case "RSI":
                return true;
            case "RDI":
                return true;
            case "RSP":
                return true;
            case "RIP":
                return true;

            case "EAX":
                return true;
            case "EBX":
                return true;
            case "ECX":
                return true;
            case "EDX":
                return true;
            case "EBP":
                return true;
            case "ESI":
                return true;
            case "EDI":
                return true;
            case "ESP":
                return true;
            case "EIP":
                return true;


            case "AX":
                return true;
            case "BX":
                return true;
            case "CX":
                return true;
            case "DX":
                return true;
            case "BP":
                return true;
            case "SI":
                return true;
            case "DI":
                return true;
            case "SP":
                return true;
            case "IP":
                return true;

            case "AL":
                return true;
            case "BL":
                return true;
            case "CL":
                return true;
            case "DL":
                return true;
            //case "BL":
            //    this.BP.L = value;
            //    break;
            //case "SL":
            //    this.SI.L = value;
            //    break;
            //case "DL":
            //    this.DI.L = value;
            //    break;
            //case "SL":
            //    this.SP.L = value;
            //    break;
            ////case "IL":
            //    this.IP.L = value;
            //    break;
            case "AH":
                return true;
            case "BH":
                return true;
            case "CH":
                return true;
            case "DH":
                return true;

            case "R8":
                return true;
            case "R9":
                return true;
            case "R10":
                return true;
            case "R11":
                return true;
            case "R12":
                return true;
            case "R13":
                return true;
            case "R14":
                return true;
            case "R15":
                return true;

            case "R8D":
                return true;
            case "R9D":
                return true;
            case "R10D":
                return true;
            case "R11D":
                return true;
            case "R12D":
                return true;
            case "R13D":
                return true;
            case "R14D":
                return true;
            case "R15D":
                return true;

            case "R8W":
                return true;
            case "R9W":
                return true;
            case "R10W":
                return true;
            case "R11W":
                return true;
            case "R12W":
                return true;
            case "R13W":
                return true;
            case "R14W":
                return true;
            case "R15W":
                return true;

            case "R8B":
                return true;
            case "R9B":
                return true;
            case "R10B":
                return true;
            case "R11B":
                return true;
            case "R12B":
                return true;
            case "R13B":
                return true;
            case "R14B":
                return true;
            case "R15B":
                return true;
        }

        return false;
    }

    static RegisterSize(name: string): number {
        if (name.charAt(0) == "%")
            name = name.substr(1);
        if (name.charAt(0) == ".")
            name = name.substr(1);

        switch (name.toUpperCase()) {
            case "RAX":
            case "RBX":
            case "RCX":
            case "RDX":
            case "RBP":
            case "RSI":
            case "RDI":
            case "RSP":
            case "RIP":
                return 8;

            case "EAX":
            case "EBX":
            case "ECX":
            case "EDX":
            case "EBP":
            case "ESI":
            case "EDI":
            case "ESP":
            case "EIP":
                return 4;


            case "AX":
            case "BX":
            case "CX":
            case "DX":
            case "BP":
            case "SI":
            case "DI":
            case "SP":
            case "IP":
                return 2;

            case "AL":
            case "BL":
            case "CL":
            case "DL":
            //case "BL":
            //    break;
            //case "SL":
            //    break;
            //case "DL":
            //    break;
            //case "SL":
            //    break;
            ////case "IL":
            //    break;
            case "AH":
            case "BH":
            case "CH":
            case "DH":
                return 1;

            case "R8":
            case "R9":
            case "R10":
            case "R11":
            case "R12":
            case "R13":
            case "R14":
            case "R15":
                return 8;

            case "R8D":
            case "R9D":
            case "R10D":
            case "R11D":
            case "R12D":
            case "R13D":
            case "R14D":
            case "R15D":
                return 4;

            case "R8W":
            case "R9W":
            case "R10W":
            case "R11W":
            case "R12W":
            case "R13W":
            case "R14W":
            case "R15W":
                return 2;

            case "R8B":
            case "R9B":
            case "R10B":
            case "R11B":
            case "R12B":
            case "R13B":
            case "R14B":
            case "R15B":
                return 1;
        }

        return 0;
    }
}

class Register {
    /* 64-Bit Register */
    protected _value: Long = new Long(0);

    public ToString(): string {
        return this._value.toString(16);
    }
}

class GeneralPurposeRegister extends Register {

    //QWORD 64-bits
    public get R(): Long {
        return this._value;
    }
    public set R(value: Long) {
        this._value = value;
    }

    //Upper 32 bits.
    public get RHigh(): Long {
        return new Long(this._value.getHighBits() & 0xFFFFFFFF);
    }
    public set RHigh(value: Long) {
        this._value.setHighBits(value.getLowBits() & 0xFFFFFFFF);
    }
    //Upper 16 bits of E size. Utility function to help manually setting values. 
    public get EHigh(): Long {
        //0xFFFF0000
        return new Long(this._value.getLowBits() >> 16, 0);
    }
    public set EHigh(value: Long) {
        var tmp = this._value.getLowBits() & 0x0000FFFF;
        tmp |= (value.getLowBits() << 16) & 0xFFFF0000;
        this._value.setLowBits(tmp); //( (this._value.getLowBits() & 0x00000000) | (value & 0xFFFFFFFF));
    }

    //Lower 32
    public get E(): Long {
        return new Long(this._value.getLowBits(), 0);
    }
    public set E(value: Long) {
        this._value.setLowBits(value.getLowBits()); //( (this._value.getLowBits() & 0x00000000) | (value & 0xFFFFFFFF));
    }

    //Lower 16 bits
    public get X(): Long {
        return this._value.maskLowBitsAnd( 0xFFFF);
    }
    public set X(value: Long) {
        this._value.setLowBits((this._value.getLowBits() & 0xFFFF0000) | (value.getLowBits() & 0xFFFF));
    }

    //Lower 8 bits
    public get L(): Long {
        return this._value.maskLowBitsAnd(0xFF); //.getLowBits() & 0xFF;
    }
    public set L(value: Long) {
        this._value.setLowBits((this._value.getLowBits() & 0xFFFFFF00) | (value.getLowBits() & 0xFF));
    }

    //Upper 8 bits of lowest 16-bits
    public get H(): Long {
        var val = this._value.getLowBits() & 0xFFFF;
        val = val >> 8;
        return new Long(val & 0xFF, 0);
    }
    public set H(value: Long) {
        var val = (value.getLowBits() & 0xFF) << 8;
        this._value.setLowBits( (this._value.getLowBits() & 0xFFFF00FF) | (val & 0xFF00));
    }


    //DWORD Lower 32
    get D(): Long {
        return this.E;
    }
    set D(value: Long) {
        this.E = value;
    }
    //WORD Lower 16 bits
    get W(): Long {
        return this.X;
    }
    set W(value: Long) {
        this.X = value;
    }
    //BYTE Lower 8 bits
    get B(): Long {
        return this.L;
    }
    set B(value: Long) {
        this.L = value;
    }
    //No access to Upper 8 bits of lowest 16-bits

}

/* 80-bit floating point register and 64-bit MMX register (overloaded) */
class FloatingPointRegister extends Register { }

/* 128-bit Register */
class XMMRegister extends Register { }

class Flags {
    //private _flags: number = 0;

    EvenParity(i: number): boolean {
        var numOfBits = this.NumberOfSetBits(i);
        return numOfBits % 2 == 0 ? false : true; // % 2 == 0 when its an odd number
    }
    NumberOfSetBits(i: number): number {
        i = i - ((i >> 1) & 0x55555555);
        i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
        return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
    }

    //NumberOfSetBits(n: number): number {
    //    var count: number = 0;
    //    var temp: number = 0;
    //    for (var i = 0; i < 64 ; i++) { // 64-bit for long data-type
    //        temp = 1;
    //        temp = temp << i;
    //        temp = n & temp;
    //        if ((temp > 0))
    //            count++;
    //    }
    //    return count;
    //}

    //NumberOfSetBits(i: number): number {
    //    https://stackoverflow.com/questions/34116205/count-number-of-set-bits-in-a-long-number
    //    i = i - ((i >>> 1) & 0x5555555555555555);
    //    i = (i & 0x3333333333333333) + ((i >>> 2) & 0x3333333333333333);
    //    i = (i + (i >>> 4)) & 0x0f0f0f0f0f0f0f0f;
    //    i = i + (i >>> 8);
    //    i = i + (i >>> 16);
    //    i = i + (i >>> 32);
    //    return i & 0x7f;
    //}

    IsByteCarried(i: Long): boolean {
        return ((i.getLowBits()) & 0x100) == 0x100 ? true : false;
    }
    IsUShortCarried(i: Long): boolean {
        return ((i.getLowBits()) & 0x10000) == 0x10000 ? true : false;
    }
    IsUIntCarried(i: Long): boolean {
        return (Math.abs(i.getHighBits()) >= 0x1) ? true : false;
        //return ((i & 0x100000000) == 0x100000000) ? true : false;
    }
    IsULongCarried(i: Long): boolean {
        var o = i.overflow;
        i.overflow = false;
        return o;
        //return ((i & 0x100000000000000000) == 0x100000000000000000) ? true : false;
    }

    IsZero(i: Long): boolean {
        return i.isZero(); // (i == 0) ? true : false;
    }

    IsByteNegative(i: Long): boolean {
        //return i < 0 ? true : false;
        return ((i.getLowBits() & 0x80) == 0x80) ? true : false;
    }
    IsUShortNegative(i: Long): boolean {
        //return i < 0 ? true : false;
        return ((i.getLowBits() & 0x8000) == 0x8000) ? true : false;
    }
    IsUIntNegative(i: Long): boolean {
        //return i < 0 ? true : false;
        return ((i.getLowBits() & 0x80000000) == 0x80000000) ? true : false;
    }
    IsULongNegative(i: Long): boolean {
        //return i < 0 ? true : false;
        return ((i.getHighBits() & 0x80000000) == 0x80000000) ? true : false;
        //return ((i & 0x8000000000000000) == 1) ? true : false;
    }

    /**
    https://en.wikibooks.org/wiki/X86_Assembly/Control_Flow#Jump_if_Lesser
    http://teaching.idallen.com/dat2343/10f/notes/040_overflow.txt
    Good lord I don't know why I have to have the lessthan check in 64-bit mode when this worked fine in 32-bit mode!?
    */
    IsByteOverFlow(i: Long, a: Long, b: Long = Long.UZERO): boolean {
        if ((a.getLowBits() & 0x80) != (b.getLowBits() & 0x80))
            return false;
        if (a.lessThan(b))
            return false;
         
        return ((i.getLowBits() & 0x80) != (a.getLowBits() & 0x80));
    }
    IsUShortOverFlow(i: Long, a: Long, b: Long = Long.UZERO): boolean {
        if ((a.getLowBits() & 0x8000) != (b.getLowBits() & 0x8000))
            return false;
        if (a.lessThan(b))
            return false;
        return (i.getLowBits() & 0x8000) != (a.getLowBits() & 0x8000);
    }
    IsUIntOverFlow(i: Long, a: Long, b: Long = Long.UZERO): boolean {
        if ((a.getLowBits() & 0x80000000) != (b.getLowBits() & 0x80000000))
            return false;
        if (a.lessThan(b))
            return false;
        return (i.getLowBits() & 0x80000000) != (a.getLowBits() & 0x80000000);
    }
    IsULongOverFlow(i: Long, a: Long, b: Long = Long.UZERO): boolean {
        //if ((a.getLowBits() & 0x80) != (b.getLowBits() & 0x80))
        //    return false;
        if (a.lessThan(b))
            return false;

        var o = i.overflow;
        i.overflow = false;
        return o; // > 0x100000000000000000;
    }

    SetAllFlagsForByte(val: Long, a: Long, b: Long = Long.UZERO) {
        this.OF = this.IsByteOverFlow(val, a, b);
        this.SF = this.IsByteNegative(val);
        this.ZF = this.IsZero(val);
        this.AF = false;
        this.PF = this.EvenParity(val.getLowBits() & 0xFF);
        this.CF = this.IsByteCarried(val);
    }
    SetAllFlagsForUShort(val: Long, a: Long, b: Long = Long.UZERO) {
        this.OF = this.IsUShortOverFlow(val, a, b);
        this.SF = this.IsUShortNegative(val);
        this.ZF = this.IsZero(val);
        this.AF = false;
        this.PF = this.EvenParity(val.getLowBits() & 0xFF);
        this.CF = this.IsUShortCarried(val);
    }
    SetAllFlagsForUInt(val: Long, a: Long, b: Long = Long.UZERO) {
        this.OF = this.IsUIntOverFlow(val, a, b);
        this.SF = this.IsUIntNegative(val);
        this.ZF = this.IsZero(val);
        this.AF = false;
        this.PF = this.EvenParity(val.getLowBits());
        this.CF = this.IsUIntCarried(val);
    }
    SetAllFlagsForULong(val: Long, a: Long, b: Long = Long.UZERO) {
        this.OF = this.IsULongOverFlow(val, a, b);
        this.SF = this.IsULongNegative(val);
        this.ZF = this.IsZero(val);
        this.AF = false;
        this.PF = this.EvenParity(val.getLowBits() & 0xFF);
        this.CF = this.IsULongCarried(val);
    }
    
    public SetFlags(size: number, val: Long, a: Long, b: Long = Long.UZERO) {
        switch (size) {
            case 1:
                this.SetAllFlagsForByte(val, a, b);
                break;
            case 2:
                this.SetAllFlagsForUShort(val, a, b);
                break;
            case 4:
                this.SetAllFlagsForUInt(val, a, b);
                break;
            case 8:
                this.SetAllFlagsForULong(val, a, b);
                break;
        }
    }




    public CF: boolean = false;
    public PF: boolean = false;
    public AF: boolean = false;
    public ZF: boolean = false;
    public SF: boolean = false;
    public TF: boolean = false;
    public IF: boolean = false;
    public DF: boolean = false;
    public OF: boolean = false;
    public NT: boolean = true;
    public RF: boolean = false;
    public VM: boolean = true;
    public AC: boolean = false;
    public VIF: boolean = false;
    public VIP: boolean = false;
    public ID: boolean = true;

    /*

    private boolToNumber(b: boolean): number {
        if (b)
            return 1;
        return 0;
    }
    //0	0x0001	CF	Carry flag	Status	CY(Carry)	NC(No Carry)
    public get CF(): boolean {
        return (this._flags & 0x0001) == 1;
    }
    public set CF(value: boolean) {
        var flagsVal = this._flags & 0xFFFFFFFFFFFFFFFE;
        var cf = this.boolToNumber(value) & 1;
        this._flags = flagsVal | cf;
    }

    //1	0x0002		Reserved, always 1 in EFLAGS[2][3]

    //2	0x0004	PF	Parity flag	Status	PE(Parity Even)	PO(Parity Odd)
    public get PF(): boolean {
        return (this._flags & 0x0004) == 1;
    }
    public set PF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFFFB) | (this.boolToNumber(value) << 2);
    }
    //3	0x0008		Reserved[3]

    //4	0x0010	AF	Adjust flag	Status	AC(Auxiliary Carry)	NA(No Auxiliary Carry)
    public get AF(): boolean {
        return (this._flags & 0x0010) == 1;
    }
    public set AF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFFEF) | (this.boolToNumber(value) << 4);
    }

    //5	0x0020		Reserved[3]

    //6	0x0040	ZF	Zero flag	Status	ZR(Zero)	NZ(Not Zero)
    public get ZF(): boolean {
        return (this._flags & 0x0040) == 1;
    }
    public set ZF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFFBF) | (this.boolToNumber(value) << 6);
    }
    //7	0x0080	SF	Sign flag	Status	NG(Negative)	PL(Positive)
    public get SF(): boolean {
        return (this._flags & 0x0080) == 1;
    }
    public set SF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFF7F) | (this.boolToNumber(value) << 7);
    }
    //8	0x0100	TF	Trap flag(single step)	Control
    public get TF(): boolean {
        return (this._flags & 0x0100) == 1;
    }
    public set TF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFEFF) | (this.boolToNumber(value) << 8);
    }

    //9	0x0200	IF	Interrupt enable flag	Control	EI(Enable Interrupt)	DI(Disable Interrupt)
    public get IF(): boolean {
        return (this._flags & 0x0200) == 1;
    }
    public set IF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFDFF) | (this.boolToNumber(value) << 9);
    }

    //10	0x0400	DF	Direction flag	Control	DN(Down)	UP(Up)
    public get DF(): boolean {
        return (this._flags & 0x0400) == 1;
    }
    public set DF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFFBFF) | (this.boolToNumber(value) << 10);
    }

    //11	0x0800	OF	Overflow flag	Status	OV(Overflow)	NV(Not Overflow)
    public get OF(): boolean {
        return (this._flags & 0x0800) == 1;
    }
    public set OF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFF7FF) | (this.boolToNumber(value) << 11);
    }

    //12 - 13	0x3000	IOPL	I / O privilege level(286 + only), always 1[clarification needed]on 8086 and 186	System

    //14	0x4000	NT	Nested task flag(286 + only), always 1 on 8086 and 186	System
    public get NT(): boolean {
        return (this._flags & 0x4000) == 1;
    }
    public set NT(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFFBFFF) | (this.boolToNumber(value) << 14);
    }

    //15	0x8000		Reserved, always 1 on 8086 and 186, always 0 on later models

    //EFLAGS
    //16	0x0001 0000	RF	Resume flag(386 + only)	System
    public get RF(): boolean {
        return (this._flags & 0x00010000) == 1;
    }
    public set RF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFEFFFF) | (this.boolToNumber(value) << 16);
    }

    //17	0x0002 0000	VM	Virtual 8086 mode flag(386 + only)	System
    public get VM(): boolean {
        return (this._flags & 0x00020000) == 1;
    }
    public set VM(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFDFFFF) | (this.boolToNumber(value) << 17);
    }

    //18	0x0004 0000	AC	Alignment check(486SX + only)	System
    public get AC(): boolean {
        return (this._flags & 0x00040000) == 1;
    }
    public set AC(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFFBFFFF) | (this.boolToNumber(value) << 18);
    }

    //19	0x0008 0000	VIF	Virtual interrupt flag(Pentium +)	System
    public get VIF(): boolean {
        return (this._flags & 0x00080000) == 1;
    }
    public set VIF(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFF7FFFF) | (this.boolToNumber(value) << 19);
    }

    //20	0x00100000	VIP	Virtual interrupt pending(Pentium +)	System
    public get VIP(): boolean {
        return (this._flags & 0x00100000) == 1;
    }
    public set VIP(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFEFFFFF) | (this.boolToNumber(value) << 20);
    }

    //21	0x00200000	ID	Able to use CPUID instruction(Pentium +)	System
    public get ID(): boolean {
        return (this._flags & 0x00200000) == 1;
    }
    public set ID(value: boolean) {
        this._flags = (this._flags & 0xFFFFFFFFFFDFFFFF) | (this.boolToNumber(value) << 21);
    }

    //22 - 31	0xFFC0 0000		Reserved	System
    //RFLAGS
    //32 - 63	0xFFFF FFFF 0000 0000		Reserved	 

*/

    public ToString(withheaders: boolean = true): string {
        //if (!withheaders) { return this._flags.toString(16); }

        var header = 'CF	PF	AF  ZF  SF	TF	IF	DF	OF	RF	VM	AC	VIF	VIP	ID\n';
        header += ' ' + this.CF + '\t ' + this.PF + '\t ' + this.AF + '\t ' + this.ZF + '\t ' + this.SF + '\t ' + this.TF +
            '\t ' + this.IF + '\t ' + this.DF + '\t ' + this.OF + '\t ' + this.RF + '\t ' + this.VM + '\t ' + this.AC +
            '\t ' + this.VIF + ' \t ' + this.VIP + ' \t ' + this.ID;

        return header;
    }

    public SaveFlags(): Long {
        var low: number = 0;
        //EFLAGS(SF: ZF: 0: AF: 0: PF: 1: CF)
        if (this.CF) low |= 0x0001;
        low |= 0x0002;
        if (this.PF) low |= 0x0004;
        low |= 0x0008;
        if (this.AF)  low |= 0x0010;
        low |= 0x0020;
        if (this.ZF) low |= 0x0040;
        if (this.SF) low |= 0x0080;
        if (this.TF) low |= 0x0100;
        if (this.IF) low |= 0x0200;
        if (this.DF) low |= 0x0400;
        if (this.OF) low |= 0x0800;
        low |= 0x3000;
        low |= 0x4000;
        //if (this.CF) low |= 0x8000;
        //EFLAGS
        if (this.RF) low |= 0x00010000;
        if (this.VM) low |= 0x00020000;
        if (this.AC) low |= 0x00040000;
        if (this.VIF) low |= 0x00080000;
        if (this.VIP) low |= 0x00100000;
        if (this.ID) low |= 0x00200000;

        return new Long(low);

    }

    public LoadFlags(f: Long, size: number = 2) {
        var low: number = f.getLowBits();

        if (size == 1) {
            //EFLAGS(SF: ZF: 0: AF: 0: PF: 1: CF)
            this.CF = (low & 0x0001) == 0x0001;
            //low |= 0x0002;
            this.PF = (low |= 0x0004) == 0x0004;
            //low |= 0x0008;
            this.AF = (low |= 0x0010) == 0x0010;
            //low |= 0x0020;
            this.ZF = (low |= 0x0040) == 0x0040;
            this.SF = (low |= 0x0080) == 0x0080;
            return;
        }

        if (size >= 2) {
            this.CF = (low & 0x0001) == 0x0001;
            //low |= 0x0002;
            this.PF = (low |= 0x0004) == 0x0004;
            //low |= 0x0008;
            this.AF = (low |= 0x0010) == 0x0010;
            //low |= 0x0020;
            this.ZF = (low |= 0x0040) == 0x0040;
            this.SF = (low |= 0x0080) == 0x0080;
            this.TF = (low |= 0x0100) == 0x0100;
            this.IF = (low |= 0x0200) == 0x0200;
            this.DF = (low |= 0x0400) == 0x0400;
            this.OF = (low |= 0x0800) == 0x0800;
            //low |= 0x3000;
            //low |= 0x4000;
            //if (this.CF) low |= 0x8000;
        }

        //EFLAGS
        if (size >= 4) {
            this.RF = (low |= 0x00010000) == 0x00010000;
            this.VM = (low |= 0x00020000) == 0x00020000;
            this.AC = (low |= 0x00040000) == 0x00040000;
            this.VIF = (low |= 0x00080000) == 0x00080000;
            this.VIP = (low |= 0x00100000) == 0x00100000;
            this.ID = (low |= 0x00200000) == 0x00200000;
        }

        //RFLAGS
        //Reserved / Unused
    }
}


enum AssociativeDirections {
    /// <summary>
    /// * / %	multiplicative
    /// + -	additive
    /// +   string concatenation    
    /// left to right
    /// </summary>
    Left,

    /// <summary>
    /// =   +=   -=
    /// *=   /=   %=
    /// &=   ^=   |=
    /// <<=  >>= >>>=	
    /// assignment  
    /// right to left
    /// </summary>
    Right,

    /// <summary>
    /// Used for Operators that apply to one element. Either way depending on context...
    /// 
    /// ++  unary post-increment
    /// --	unary post-decrement
    ///     not associative
    /// </summary>
    None
}

enum Operation {
    None = 0,
    // Comparison operators
    /// <summary>
    /// Returns true if the operands are equal. (==)
    /// </summary>
    Equal = 1,
    /// <summary>
    /// Returns true if the operands are equal and of the same type. See also Object.is and sameness in JS. (===)
    /// </summary>
    StrictEqual,
    /// <summary>
    /// Returns true if the operands are of the same type but not equal, or are of different type. (!==)
    /// </summary>
    StrictNotEqual,
    /// <summary>
    /// Returns true if the operands are not equal. (!=)
    /// </summary>
    NotEqual,
    /// <summary>
    /// Returns true if the left operand is greater than the right operand. (>)
    /// </summary>
    GreaterThan,
    /// <summary>
    /// Returns true if the left operand is greater than or equal to the right operand. (>=)
    /// </summary>
    GreateerThanEqual,
    /// <summary>
    /// Returns true if the left operand is less than the right operand. (<)
    /// </summary>
    LessThan,
    /// <summary>
    /// Returns true if the left operand is less than or equal to the right operand. (<=)
    /// </summary>
    LessThanEqual,
    //Assignment operators
    /// <summary>
    /// The : symbol used to asign variables inside object declarations.
    /// class c {
    ///     a : 1,
    ///     b : 2
    /// }
    /// </summary>
    InnerAssignment,
    /// <summary>
    /// x = y   x = y
    /// </summary>
    Assignment,
    /// <summary>
    /// x += y  x = x + y 
    /// </summary>
    AdditionAssignment,
    /// <summary>
    /// x -= y  x = x - y 
    /// </summary>
    SubtractionAssignment,
    /// <summary>
    ///x *= y  x = x * y  
    /// </summary>
    MultiplicationAssignment,
    /// <summary>
    ///x /= y  x = x / y   
    /// </summary>
    DivisionAssignment,
    /// <summary>
    ///x %= y  x = x % y 
    /// </summary>
    RemainderAssignment,
    /// <summary>
    ///x **= y x = x ** y    
    /// </summary>
    ExponentiationAssignment,
    /// <summary>
    ///x <<= y x = x << y   
    /// </summary>
    LeftShiftAssignment,
    /// <summary>
    ///x >>= y x = x >> y   
    /// </summary>
    RightShiftAssignment,
    /// <summary>
    ///x >>>= y    x = x >>> y 
    /// </summary>
    UnsignedRightShiftAssignment,
    /// <summary>
    /// x &= y  x = x & y
    /// </summary>
    BitwiseANDAssignment,
    /// <summary>
    ///x ^= y  x = x ^ y  
    /// </summary>
    BitwiseXORAssignment,
    /// <summary>
    ///x |= y  x = x | y  
    /// </summary>
    BitwiseORAssignment,
    //Arithmetic operators
    /// <summary>
    /// Binary operator. Returns the integer remainder of dividing the two operands.	
    /// 12 % 5 returns 2.
    /// </summary>
    Remainder,
    /// <summary>
    /// Unary operator. Adds one to its operand. If used as a prefix operator (++x), returns the value of its operand after adding one; if used as a postfix operator (x++), returns the value of its operand before adding one.	
    /// If x is 3, then ++x sets x to 4 and returns 4, whereas x++ returns 3 and, only then, sets x to 4.
    /// </summary>
    Increment,
    /// <summary>
    /// Unary operator. Subtracts one from its operand. The return value is analogous to that for the increment operator.	
    /// If x is 3, then --x sets x to 2 and returns 2, whereas x-- returns 3 and, only then, sets x to 2.
    /// </summary>
    Decrement,
    /// <summary>
    /// Unary operator. Returns the negation of its operand.	
    /// If x is 3, then -x returns -3.
    /// </summary>
    UnaryNegation,
    /// <summary>
    /// Unary operator. Attempts to convert the operand to a number, if it is not already.	
    /// +"3" returns 3.
    /// +true returns 1.
    /// </summary>
    UnaryPlus,
    /// <summary>
    /// Calculates the base to the exponent power, that is, baseexponent
    /// 2 ** 3 returns 8.
    /// 10 ** -1 returns 0.1.
    /// </summary>
    ExponentiationOperator,
    /// <summary>
    /// Binary operator. Returns the integer divisor of dividing the two operands.	
    /// </summary>
    Division,
    /// <summary>
    /// Binary operator. Returns the integer mutplicant of multiplying the two operands.	
    /// </summary>
    Multiplication,
    //Bitwise operators
    /// <summary>
    /// a & b   
    /// Returns a one in each bit position for which the corresponding bits of both operands are ones.
    /// </summary>
    BitwiseAND,
    /// <summary>
    /// a | b   
    /// Returns a zero in each bit position for which the corresponding bits of both operands are zeros.
    /// </summary>
    BitwiseOR,
    /// <summary>
    /// a ^ b   
    /// Returns a zero in each bit position for which the corresponding bits are the same.
    /// [Returns a one in each bit position for which the corresponding bits are different.]
    /// </summary>
    BitwiseXOR,
    /// <summary>
    /// ~ a Inverts the bits of its operand.
    /// </summary>
    BitwiseNOT,
    /// <summary>
    /// a << b  
    /// Shifts a in binary representation b bits to the left, shifting in zeros from the right.
    /// </summary>
    LeftShift,
    /// <summary>
    /// a >> b  
    /// Shifts a in binary representation b bits to the right, discaDIng bits shifted off.
    /// </summary>
    SignPropagatingRightShift,
    /// <summary>
    /// a >>> b 
    /// Shifts a in binary representation b bits to the right, discaDIng bits shifted off, and shifting in zeros from the left.
    /// </summary>
    ZeroFillRightShift,
    //Logical operators
    /// <summary>
    /// (&&)
    /// expr1 && expr2  Returns expr1 if it can be converted to false; otherwise, returns expr2. 
    /// Thus, when used with Boolean values, && returns true if both operands are true; otherwise, returns false.
    /// </summary>
    LogicalAND,
    /// <summary>
    /// (||)	
    /// expr1 || expr2  Returns expr1 if it can be converted to true; otherwise, returns expr2. Thus, when used with Boolean values, || returns true if either operand is true; if both are false, returns false.
    /// </summary>
    LogicalOR,
    /// <summary>
    /// (!)	
    /// !expr   Returns false if its single operand that can be converted to true; otherwise, returns true.
    /// </summary>
    LogicalNOT,
    /// <summary>
    /// The delete operator deletes an object, an object's property, or an element at a specified index in an array.
    /// </summary>
    Delete,
    /// <summary>
    /// The typeof operator is used in either of the following ways:
    /// The typeof operator returns a string indicating the type of the unevaluated operand. 
    /// operand is the string, variable, keyword, or object for which the type is to be returned. 
    /// The parentheses are optional.
    /// </summary>
    TypeOf,
    /// <summary>
    /// The void operator is used in either of the following ways:
    /// void (expression)
    /// void expression
    /// The void operator specifies an expression to be evaluated without returning a value. 
    /// expression is a JavaScIPt expression to evaluate. 
    /// The parentheses surrounding the expression are optional, but it is good style to use them.
    /// </summary>
    Void,
    //Relational operators
    /// <summary>
    /// The instanceof operator returns true if the specified object is of the specified object type. The syntax is:
    /// objectName instanceof objectType
    /// where objectName is the name of the object to compare to objectType, and objectType is an object type, such as Date or Array.
    /// </summary>
    InstanceOf,
    /// <summary>
    /// The in operator returns true if the specified property is in the specified object. The syntax is:
    /// propNameOrNumber in objectName
    /// where propNameOrNumber is a string, numeric, or symbol expression representing a property name or array index, and objectName is the name of an object.
    /// </summary>
    In,
    /// <summary>
    /// ?
    /// </summary>
    ConditionalExpression,
    /// <summary>
    /// .
    /// eg: object.ptr_to_member
    /// 
    /// </summary>
    MemberSelection,
    /////Look up value 
    //MemoryLookup
    Length
}

class Operator {

    public static Operators: Operator[] = [
        new Operator("+"), new Operator("-"), new Operator("*"), new Operator("/"), new Operator("MOD"),
        //new Operator("++", AssociativeDirections.None), new Operator("--", AssociativeDirections.None),
        //new Operator("="), new Operator("+="), new Operator("-="), new Operator("*="), new Operator("/="), new Operator("%="),
        new Operator("EQ"), new Operator("NE"), new Operator("GT"), new Operator("LT"), new Operator("GE"), new Operator("LE"),
        //new Operator("?"),
        new Operator("AND"), new Operator("OR"), new Operator("XOR"), new Operator("NOT"), new Operator("SHL"), new Operator("SHR"),
        //new Operator("&"), new Operator("|"), new Operator("~"), new Operator(">>>"),
        //new Operator("typeof"), new Operator("instanceof"),
        new Operator("."), //(structure-field-name operator)
        new Operator(":"), //(segment-override operator)
        //new Operator("["), //Memory lookup
        new Operator("LENGTH", AssociativeDirections.Right)
    ];


    public Op: Operation;
    public AssociativeDirection: AssociativeDirections;

    constructor(op: string | Operation, associatevedirection: AssociativeDirections = AssociativeDirections.Left) {
        this.AssociativeDirection = associatevedirection;
        if (typeof op == "string")
            this.Op = Operator.GetOperationFromValue(op);
        else
            this.Op = op;
    }


    public ComparePrecedence(o: Operator): number {
        return this.Prescedence > o.Prescedence ? 1 :
            o.Prescedence == this.Prescedence ? 0 : -1;
    }

    public static GetOperationFromValue(op: string): Operation {
        switch (op.toUpperCase()) {
            //case "[":
            //    return Operation.MemoryLookup;
            case ".":
                return Operation.MemberSelection;
            // Comparison operators
            case "EQ":
            case "==":
                return Operation.Equal;
            //case "===":
            //    return Operation.StrictEqual;
            //case "!==":
            //    return Operation.StrictNotEqual;
            case "NE":
            case "!=":
                return Operation.NotEqual;
            case "GT":
            case ">":
                return Operation.GreaterThan;
            case "GE":
            case ">=":
                return Operation.GreateerThanEqual;
            case "LT":
            case "<":
                return Operation.LessThan;
            case "LE":
            case "<=":
                return Operation.LessThanEqual;
            //case "?":
            //    return Operation.ConditionalExpression;

            //Assignment operators

            case ":":
                return Operation.InnerAssignment;
            //case "=":
            //    return Operation.Assignment;
            //case "+=":
            //    return Operation.AdditionAssignment;
            //case "-=":
            //    return Operation.SubtractionAssignment;
            //case "*=":
            //    return Operation.MultiplicationAssignment;
            //case "/=":
            //    return Operation.DivisionAssignment;
            //case "%=":
            //    return Operation.RemainderAssignment;
            //case "**=":
            //    return Operation.ExponentiationAssignment;
            //case "<<=":
            //    return Operation.LeftShiftAssignment;
            //case ">>=":
            //    return Operation.RightShiftAssignment;
            //case ">>>=":
            //    return Operation.UnsignedRightShiftAssignment;
            //case "&=":
            //    return Operation.BitwiseANDAssignment;
            //case "^=":
            //    return Operation.BitwiseXORAssignment;
            //case "|=":
            //    return Operation.BitwiseORAssignment;

            //Arithmetic operators

            case "MOD":
            case "%":
                return Operation.Remainder;
            //case "++":
            //    return Operation.Increment;
            //case "--":
            //    return Operation.Decrement;
            case "-":
                return Operation.UnaryNegation;
            case "+":
                return Operation.UnaryPlus;
            //case "**":
            //    return Operation.ExponentiationOperator;
            case "*":
                return Operation.Multiplication;
            case "/":
                return Operation.Division;
            //Bitwise operators

            case "AND":
            case "&":
                return Operation.BitwiseAND;
            case "OR":
            case "|":
                return Operation.BitwiseOR;
            case "XOR":
            case "^":
                return Operation.BitwiseXOR;
            case "NOT":
            case "~":
                return Operation.BitwiseNOT;
            case "SHL":
            case "<<":
                return Operation.LeftShift;
            case "SHR":
            case ">>":
                return Operation.SignPropagatingRightShift;
            case "LENGTH":
                return Operation.Length;
            //case ">>>":
            //    return Operation.ZeroFillRightShift;

            //Logical operators

            //case "&&":
            //    return Operation.LogicalAND;
            //case "||":
            //    return Operation.LogicalOR;
            //case "!":
            //    return Operation.LogicalNOT;
            //case "delete":
            //    return Operation.Delete;
            //case "typeof":
            //    return Operation.TypeOf;
            //case "void":
            //    return Operation.Void;

            //Relational operators

            //case "instanceof":
            //    return Operation.InstanceOf;
            //case "in":
            //    return Operation.In;
        }
        return Operation.None;
    }

    public static Contains(list: Operator[], strop: string): boolean {
        if (!list)
            list = Operator.Operators;

        var op = Operator.GetOperationFromValue(strop);

        for (var i = 0; i < list.length; i++) {
            var oper = list[i];
            if (oper.Op == op)
                return true;
        }

        return false;
    }

    //    public static Contains(strop: string ): boolean
    //{
    //        var op = Operator.GetOperationFromValue(strop);

    //    foreach(Operator oper in Operators)
    //    {
    //        if (oper.Op == op)
    //            return true;
    //    }

    //    return false;
    //}

    public static Get(list: Operator[], strop: string): Operator {
        if (!list)
            list = Operator.Operators;

        var op = Operator.GetOperationFromValue(strop);

        for (var i = 0; i < list.length; i++) {
            var oper: Operator = list[i];
            if (oper.Op == op)
                return oper;
        }

        return null;
    }

    //    public static Get(strop: string): Operator
    //{
    //        var op = Operator.GetOperationFromValue(strop);

    //    foreach(Operator oper in Operators)
    //    {
    //        if (oper.Op == op)
    //            return oper;
    //    }

    //    return null;
    //}

    public get Prescedence(): number {
        {
            switch (this.Op) {
                case Operation.MemberSelection: return 3;
                //case ")": return 0;
                //case ";": return 0;
                //case ",": return 0;
                case Operation.Assignment: return 0;
                case Operation.InnerAssignment: return 1;
                //case "]": return 0;
                case Operation.LogicalOR: return 1;
                case Operation.LogicalAND: return 2;
                case Operation.BitwiseOR: return 3;
                case Operation.BitwiseXOR: return 4; // ^
                case Operation.BitwiseAND: return 5;
                case Operation.Equal: return 6;
                case Operation.NotEqual: return 6;
                case Operation.StrictEqual: return 6;
                case Operation.StrictNotEqual: return 6;
                case Operation.LessThan: return 7;
                case Operation.GreaterThan: return 7;
                case Operation.LessThanEqual: return 7;
                case Operation.GreateerThanEqual: return 7;
                case Operation.LeftShift: return 8;
                case Operation.SignPropagatingRightShift: return 8;
                case Operation.UnsignedRightShiftAssignment: return 8;
                case Operation.UnaryPlus: return 9;
                case Operation.UnaryNegation: return 9;
                case Operation.Multiplication: return 11;
                case Operation.Division: return 11;
                case Operation.Remainder: return 11;

                case Operation.InstanceOf: return 12;
                case Operation.TypeOf: return 12;
                case Operation.ZeroFillRightShift: return 8;
                case Operation.BitwiseNOT: return 5;
                case Operation.LogicalNOT: return 2;
                case Operation.ConditionalExpression: return 15;
            }

            return -1;
        }

    }

    public ToString(): string {
        switch (this.Op) {
            case Operation.MemberSelection:
                return ".";
            case Operation.AdditionAssignment:
                return "+=";
            case Operation.Assignment:
                return "=";
            case Operation.InnerAssignment:
                return ":";
            case Operation.BitwiseAND:
                return "&";
            case Operation.BitwiseANDAssignment:
                return "&=";
            case Operation.BitwiseNOT:
                return "!";
            case Operation.BitwiseOR:
                return "|";
            case Operation.BitwiseORAssignment:
                return "|=";
            case Operation.BitwiseXOR:
                return "^";
            case Operation.BitwiseXORAssignment:
                return "^=";
            case Operation.ConditionalExpression:
                return "?";
            case Operation.Decrement:
                return "--";
            case Operation.Delete:
                return "delete";
            case Operation.Division:
                return "/";
            case Operation.DivisionAssignment:
                return "/=";
            case Operation.Equal:
                return "==";
            case Operation.ExponentiationAssignment:
                return "**=";
            case Operation.ExponentiationOperator:
                return "**";
            case Operation.GreateerThanEqual:
                return ">=";
            case Operation.GreaterThan:
                return ">";
            case Operation.In:
                return "in";
            case Operation.Increment:
                return "==";
            case Operation.InstanceOf:
                return "instanceof";
            case Operation.LeftShift:
                return "<<";
            case Operation.LeftShiftAssignment:
                return "<<=";
            case Operation.LessThan:
                return "<";
            case Operation.LessThanEqual:
                return "<=";
            case Operation.LogicalAND:
                return "&&";
            case Operation.LogicalNOT:
                return "!";
            case Operation.LogicalOR:
                return "||";
            case Operation.Multiplication:
                return "*";
            case Operation.MultiplicationAssignment:
                return "*=";
            case Operation.NotEqual:
                return "!=";
            case Operation.Remainder:
                return "%";
            case Operation.RemainderAssignment:
                return "%=";
            case Operation.RightShiftAssignment:
                return ">>=";
            case Operation.SignPropagatingRightShift:
                return ">>";
            case Operation.StrictEqual:
                return "===";
            case Operation.StrictNotEqual:
                return "!==";
            case Operation.SubtractionAssignment:
                return "-=";
            case Operation.TypeOf:
                return "typeof";
            case Operation.UnaryNegation:
                return "-";
            case Operation.UnaryPlus:
                return "+";
            case Operation.UnsignedRightShiftAssignment:
                return ">>>=";
            case Operation.Void:
                return "void";
            case Operation.ZeroFillRightShift:
                return ">>>";
            default:
            case Operation.None:
                return "";
        }
    }

}

class Token {
    public TokenType: TokenTypes;
    public Value: string;
    public TokenIndex: number;
    public TokenLength: number;
    public RightAssociative: boolean;

    public ToString(): string {
        //return TokenType + " {" + TokenIndex + ", " + TokenLength + "} " + Value;
        return this.Value;
    }
}

enum TokenTypes {
    Name,
    Mnemonic,
    String,
    Operator,
    Number,
    Comment,
    Keyword,
    Punctuator,
    Label
}

/// <summary>
/// https://www.regextester.com/94780
/// </summary>
const tokeniserRegex: string = "((([\\w/\\-\\$@#%])|(\\.(?!$)))+)|([^\\s\\w/\\-\\$@#%.])|\\.$"; // @"((([\w/\-\$@#'%])|(\.(?!$)))+)|([^\s\w/\-\$@#'%.])|\.$";
const escapechar: string = '\\';

const Punctuators: string[] = ["(", ")", "[", "]", ":", "{", "}", ","];
const CommentChar: string = ';';

const Mnemonics: string[] = ["ADC", "ADD", "ADDPD", "ADDPS", "ADDSD", "ADDSS", "ADDSUBPD", "ADDSUBPS", "AND", "ANDNPD", "ANDNPS", "ANDPD", "ANDPS",
    "BLENDPD", "BLENDPS", "BSF", "BSR", "BSWAP", "BT", "BTC", "BTR", "BTS",
    "CALL", "CALLF", "CBW", "CDQ", "CDQE", "CLC", "CLD", "CLFLUSH", "CLI", "CLTS", "CMC", "CMOVA", "CMOVAE", "CMOVB", "CMOVBE", "CMOVC",
    "CMOVE", "CMOVG", "CMOVGE", "CMOVL", "CMOVLE", "CMOVNA", "CMOVNAE", "CMOVNB", "CMOVNBE", "CMOVNC", "CMOVNE", "CMOVNG", "CMOVNGE",
    "CMOVNL", "CMOVNLE", "CMOVNO", "CMOVNP", "CMOVNS", "CMOVNZ", "CMOVO", "CMOVP", "CMOVPE", "CMOVPO", "CMOVS", "CMOVZ", "CMP",
    "CMPPD", "CMPPS", "CMPS", "CMPSB", "CMPSD", "CMPSQ", "CMPSS", "CMPSW", "CMPXCHG", "CMPXCHG16B", "CMPXCHG8B", "COMISD", "COMISS",
    "CPUID", "CQO", "CRC32", "CVTDQ2PD", "CVTDQ2PS", "CVTPD2DQ", "CVTPD2PI", "CVTPD2PS", "CVTPI2PD", "CVTPI2PS", "CVTPS2DQ", "CVTPS2PD",
    "CVTPS2PI", "CVTSD2SI", "CVTSD2SS", "CVTSI2SD", "CVTSI2SS", "CVTSS2SD", "CVTSS2SI", "CVTTPD2DQ", "CVTTPD2PI", "CVTTPS2DQ",
    "CVTTPS2PI", "CVTTSD2SI", "CVTTSS2SI", "CWD", "CWDE",
    "DEC", "DIV", "DIVPD", "DIVPS", "DIVSD", "DIVSS", "DPPD", "DPPS",
    "EMMS", "END", "ENTER", "EXTRACTPS",
    "F2XM1", "FABS", "FADD", "FADDP", "FBLD", "FBSTP", "FCHS", "FCLEX", "FCMOVB", "FCMOVBE", "FCMOVE", "FCMOVNB",
    "FCMOVNBE", "FCMOVNE", "FCMOVNU", "FCMOVU", "FCOM", "FCOM2", "FCOMI", "FCOMIP", "FCOMP", "FCOMP3", "FCOMP5",
    "FCOMPP", "FCOS", "FDECSTP", "FDIV", "FDIVP", "FDIVR", "FDIVRP", "FFREE", "FFREEP", "FIADD", "FICOM", "FICOMP",
    "FIDIV", "FIDIVR", "FILD", "FIMUL", "FINCSTP", "FINIT", "FIST", "FISTP", "FISTTP", "FISUB", "FISUBR", "FLD", "FLD1",
    "FLDCW", "FLDENV", "FLDL2E", "FLDL2T", "FLDLG2", "FLDLN2", "FLDPI", "FLDZ", "FMUL", "FMULP", "FNCLEX", "FNDISI ", "FNENI",
    "FNINIT", "FNOP", "FNSAVE", "FNSETPM", "FNSTCW", "FNSTENV", "FNSTSW", "FPATAN", "FPREM", "FPREM1", "FPTAN", "FRNDINT",
    "FRSTOR", "FS", "FSAVE", "FSCALE", "FSIN", "FSINCOS", "FSQRT", "FST", "FSTCW", "FSTENV", "FSTP", "FSTP1", "FSTP8", "FSTP9",
    "FSTSW", "FSUB", "FSUBP", "FSUBR", "FSUBRP", "FTST", "FUCOM", "FUCOMI", "FUCOMIP", "FUCOMP", "FUCOMPP", "FWAIT", "FXAM", "FXCH",
    "FXCH4", "FXCH7", "FXRSTOR", "FXSAVE", "FXTRACT", "FYL2X", "FYL2XP1",
    "GETSEC", "GS",
    "HADDPD", "HADDPS", "HINT_NOP", "HLT", "HSUBPD", "HSUBPS",
    "ICEBP", "IDIV", "IMUL", "IN", "INC", "INS", "INSB", "INSD", "INSERTPS", "INSW", "INT", "INT1", "INTO", "INVD", "INVEPT",
    "INVLPG", "INVVPID", "IRET", "IRETD", "IRETQ",
    "JA", "JAE", "JB", "JBE", "JC", "JE", "JECXZ", "JG", "JGE", "JL", "JLE", "JMP", "JMPF", "JNA", "JNAE", "JNB", "JNBE", "JNC", "JNE",
    "JNG", "JNGE", "JNL", "JNLE", "JNO", "JNP", "JNS", "JNZ", "JO", "JP", "JPE", "JPO", "JCXZ", "JS", "JZ",
    "LAHF", "LAR", "LDDQU", "LDMXCSR", "LEA", "LEAVE", "LFENCE", "LFS", "LGDT", "LGS", "LIDT", "LLDT", "LMSW", "LOCK", "LODS", "LODSB",
    "LODSD", "LODSQ", "LODSW", "LOOP", "LOOPE", "LOOPNE", "LOOPNZ", "LOOPZ", "LSL", "LSS", "LTR",
    "MASKMOVDQU", "MASKMOVQ", "MAXPD", "MAXPS", "MAXSD", "MAXSS", "MFENCE", "MINPD", "MINPS", "MINSD", "MINSS", "MONITOR",
    "MOV", "MOVAPD", "MOVAPS", "MOVBE", "MOVD", "MOVDDUP", "MOVDQ2Q", "MOVDQA", "MOVDQU", "MOVHLPS", "MOVHPD", "MOVHPS", "MOVLHPS",
    "MOVLPD", "MOVLPS", "MOVMSKPD", "MOVMSKPS", "MOVNTDQ", "MOVNTI", "MOVNTPD", "MOVNTPS", "MOVNTQ", "MOVQ", "MOVQ2DQ", "MOVS", "MOVSB",
    "MOVSD", "MOVSHDUP", "MOVSLDUP", "MOVSQ", "MOVSS", "MOVSW", "MOVSX", "MOVSXD", "MOVUPD", "MOVUPS", "MOVZX", "MPSADBW", "MUL",
    "MULPD", "MULPS", "MULSD", "MULSS", "MWAIT", "NEG", "NOP", "NOT",
    "OR", "ORPD", "ORPS", "OUT", "OUTS", "OUTSB", "OUTSD", "OUTSW",
    "PACKSSDW", "PACKSSWB", "PACKUSWB", "PADDB", "PADDD", "PADDQ", "PADDSB", "PADDSW", "PADDUSB", "PADDUSW", "PADDW", "PALIGNR", "PAND",
    "PANDN", "PAUSE", "PAVGB", "PAVGW", "PBLENDW", "PCMPEQB", "PCMPEQD", "PCMPEQW", "PCMPESTRI", "PCMPESTRM", "PCMPGTB", "PCMPGTD",
    "PCMPGTW", "PCMPISTRI", "PCMPISTRM", "PEXTRB", "PEXTRD", "PEXTRQ", "PEXTRW", "PINSRB", "PINSRD", "PINSRQ", "PINSRW", "PMADDWD",
    "PMAXSW", "PMAXUB", "PMINSW", "PMINUB", "PMOVMSKB", "PMULHUW", "PMULHW", "PMULLW", "PMULUDQ", "POP", "POPCNT", "POPF", "POPFD", "POPFQ",
    "POR", "PREFETCHNTA", "PREFETCHT0", "PREFETCHT1", "PREFETCHT2", "PSADBW", "PSHUFD", "PSHUFHW", "PSHUFLW", "PSHUFW", "PSLLD",
    "PSLLDQ", "PSLLQ", "PSLLW", "PSRAD", "PSRAW", "PSRLD", "PSRLDQ", "PSRLQ", "PSRLW", "PSUBB", "PSUBD", "PSUBQ", "PSUBSB", "PSUBSW",
    "PSUBUSB", "PSUBUSW", "PSUBW", "PUNPCKHBW", "PUNPCKHDQ", "PUNPCKHQDQ", "PUNPCKHWD", "PUNPCKLBW", "PUNPCKLDQ", "PUNPCKLQDQ",
    "PUNPCKLWD", "PUSH", "PUSHF", "PUSHFD", "PUSHFQ", "PXOR",
    "RCL", "RCPPS", "RCPSS", "RCR", "RDMSR", "RDPMC", "RDTSC", "RDTSCP", "REP", "REPE", "REPNE", "REPNZ", "REPZ", "RET", "RETF", "RETN", "REX",
    "REX.B", "REX.R", "REX.RB", "REX.RX", "REX.RXB", "REX.W", "REX.WB", "REX.WR", "REX.WRB", "REX.WRX", "REX.WRXB", "REX.WX", "REX.WXB",
    "REX.X", "REX.XB", "ROL", "ROR", "ROUNDPD", "ROUNDPS", "ROUNDSD", "ROUNDSS", "RSM", "RSQRTPS", "RSQRTSS",
    "SAHF", "SAL", "SAR", "SBB", "SCAS", "SCASB", "SCASD", "SCASQ", "SCASW", "SETA", "SETAE", "SETB", "SETBE", "SETC", "SETE", "SETG",
    "SETGE", "SETL", "SETLE", "SETNA", "SETNAE", "SETNB", "SETNBE", "SETNC", "SETNE", "SETNG", "SETNGE", "SETNL", "SETNLE", "SETNO",
    "SETNP", "SETNS", "SETNZ", "SETO", "SETP", "SETPE", "SETPO", "SETS", "SETZ", "SFENCE", "SGDT", "SHL", "SHLD", "SHR", "SHRD",
    "SHUFPD", "SHUFPS", "SIDT", "SLDT", "SMSW", "SQRTPD", "SQRTPS", "SQRTSD", "SQRTSS", "STC", "STD", "STI", "STMXCSR", "STOS",
    "STOSB", "STOSD", "STOSQ", "STOSW", "STR", "SUB", "SUBPD", "SUBPS", "SUBSD", "SUBSS", "SWAPGS", "SYSCALL", "SYSENTER", "SYSEXIT",
    "SYSRET",
    "TEST",
    "UCOMISD", "UCOMISS", "UD", "UD2", "UNPCKHPD", "UNPCKHPS", "UNPCKLPD", "UNPCKLPS",
    "VERR", "VERW", "VMCALL", "VMCLEAR", "VMLAUNCH", "VMPTRLD", "VMPTRST", "VMREAD", "VMRESUME", "VMWRITE", "VMXOFF", "VMXON",
    "WAIT", "WBINVD", "WRMSR",
    "XADD", "XCHG", "XGETBV", "XLAT", "XLATB", "XOR", "XORPD", "XORPS", "XRSTOR", "XSAVE", "XSETBV",

    "PUSHA", "POPA", "PUSHAD", "POPAD"
];

const Keywords: string[] = [
    
    "DF", "GROUP", "ORG", "DGROUP", "%OUT", "DOSSEG", "HIGH", "PAGE", "DQ", "IF", "PARA", "DS", "IF1", "PROC", "DT", "IF2", "PTR",
    "DUP", "IFB", "PUBLIC", "DW", "IFDEF", "PURGE", "DWORD", "IFGIF", "QWORD", ".186", "ELSE", "IFDE", ".RADIX.286", "IFIDN", "RECORD",
    ".286P", "ENDIF", "IFNB", "REPT", ".287", "ENDM", "IFNDEF", ".SALL", ".386", "ENDP", "INCLUDE", "SEG", ".386P", "ENDS", "INCLUDELIB",
    "SEGMENT", ".387", "IRP", ".SEQ", ".8086", "EQU", "IRPC", ".SFCOND", ".8087", ".ERR", "LABEL", "ALIGN", ".ERR1", ".LALL",
    "SHORT", ".ALPHA", ".ERR2", "LARGE",".ERRB", "SIZE", "ASSUME", ".ERRDEF", "SMALL", "AT", ".ERDIF", ".LFCOND",
    "STACK", "BYTE", ".ERRE", ".LIST", "@STACK", ".CODE", ".ERRIDN", "LOCAL", ".STACK", "@CODE", ".ERRNB", "LOW", "STRUC", "@CODESIZE", ".ERRNDEF",
    "SUBTTL", "COMM", ".ERRNZ", "MACRO", "TBYTE", "COMMENT", "EVEN", "MASK", ".TFCOND", ".CONST", "EXITM", "MEDIUM", "THIS", ".CREF",
    "EXTRN", "TITLE", "@CURSEG", "FAR", ".MODEL", "TYPE", "@DATA", "@FARDATA", "NAME", ".TYPE", ".DATA", ".FARDATA", "WIDTH",
    "@DATA?", "@FARDATA?", "NEAR", "WORD", ".DATA?", ".FARDATA?", "@WORDSIZE", "@DATASIZE", "@FILENAME", "NOTHING", ".XALL", "DB", "FWORD",
    "OFFSET", ".XCREP", "DD", ".XLIST"

];

class Tokenizer {
    public Tokenize(scIPt: string, addComments: boolean = false): Token[] {
        var toReturn: Token[] = [];

        var ex: RegExp = new RegExp(tokeniserRegex, "gmis");

        var instring: boolean = false;
        var lastcharisescape: boolean = false;
        var stringliteralStart: number = -1;
        var stringopening: string = "\"";
        var tokentype: TokenTypes = TokenTypes.String;

        var skipBeforeIndex: number = -1;

        var d: number; //For testing if a number.
        var val;

        //var matches: RegExpExecArray = ex.exec(scIPt);

        var m;
        while ((m = ex.exec(scIPt)) !== null)
        //for (var matchidx = 0; matchidx < matches.length; matchidx++)
        {
            //var m = matches[matchidx];
            var mValue: string = m[0];
            if (skipBeforeIndex > m.index)
                continue;

            var t: Token = new Token();
            t.Value = mValue;
            t.TokenIndex = m.index;
            t.TokenLength = mValue.length; // m.lastIndex - m.index;
            t.TokenType = TokenTypes.Name;

            if (!instring && (mValue.indexOf(CommentChar) == 0)) // || (mValue == "/" && m.NextMatch() != null && m.NextMatch().Value == "*"))) //Check for comments.
            {
                stringliteralStart = m.index;
                stringopening = mValue;
                lastcharisescape = false;
                tokentype = t.TokenType = TokenTypes.Comment;

                //int startindex;
                var endindex: number;

                if (mValue.indexOf(CommentChar) == 0) //Special case as the closing \n token is excluded by regex....
                {
                    //startindex = t.TokenIndex;
                    endindex = scIPt.indexOf('\n', t.TokenIndex);
                }
                else //if (m.Value == "/*")
                {
                    //startindex = t.TokenIndex;
                    endindex = scIPt.indexOf("*/", t.TokenIndex) + 3;
                }

                if (endindex == -1) //EOF Reached.
                {
                    t.Value = scIPt.substring(t.TokenIndex);

                    if (addComments || t.TokenType != TokenTypes.Comment)
                        toReturn.push(t);

                    break;
                }
                else {
                    t.TokenLength = endindex - t.TokenIndex;
                    t.Value = scIPt.substring(t.TokenIndex, t.TokenIndex + t.TokenLength);
                    skipBeforeIndex = endindex;
                }
                //stringopening = "\n";
            }
            else if (!instring && (mValue == "\"" || mValue == "'")) //Check for String literal opening.
            {
                stringliteralStart = m.index;
                instring = true;
                stringopening = mValue;
                lastcharisescape = false;
                tokentype = TokenTypes.String;
                continue;
            }
            else if (instring && (mValue == stringopening) && !lastcharisescape) //Check for string literal closing.
            {
                if (stringliteralStart == -1)
                    throw new DOMException("Error while attempting to parse a string literal. Closing string detected but no staring index!?");

                instring = false;
                t.Value = scIPt.substring(stringliteralStart + 1, stringliteralStart + 1 + m.index - stringliteralStart - 1);
                t.TokenIndex = stringliteralStart;
                t.TokenLength = m.index - stringliteralStart - 1;

                if (t.Value.indexOf("\\") >= 0) {
                    t.Value = t.Value.replace(/\\0/g, "\0");
                    t.Value = t.Value.replace(/\\n/g, "\n");
                    t.Value = t.Value.replace(/\\r/g, "\r");
                    t.Value = t.Value.replace(/\\t/g, "\t");
                    t.Value = unescape(t.Value);
                }
                t.TokenType = tokentype;

                stringliteralStart = -1;
                lastcharisescape = false;
            }
            else if (instring && (mValue == "\\") && !lastcharisescape) //Check for escaped character
            {
                lastcharisescape = true;
                continue;
            }
            else if (instring) //Still in a string.
            {
                lastcharisescape = false;
                continue;
            }
            else if (Keywords.indexOf(t.Value.toUpperCase()) >= 0) //Check is a Keyword.
                t.TokenType = TokenTypes.Keyword;
            else if (Mnemonics.indexOf(t.Value.toUpperCase()) >= 0) //Check is a Keyword.
                t.TokenType = TokenTypes.Mnemonic;
            else if (Punctuators.indexOf(t.Value) >= 0) //Check is a Keyword.
                t.TokenType = TokenTypes.Punctuator;
            else if (t.Value.indexOf("0x") == 0) {
                val = Long.fromString(t.Value, false, 16);
                t.Value = (val) + "";
                t.TokenType = TokenTypes.Number;
            }
            else if (t.Value.indexOf("h") == t.Value.length - 1 && !Registers.IsRegister(t.Value) && /^([a-fA-F0-9]*)$/.test(t.Value.substr(0, t.Value.length - 1))) {
                val = Long.fromString(t.Value.substr(0, t.Value.length - 1), false, 16);
                t.Value = (val) + "";
                t.TokenType = TokenTypes.Number;
            }
            else if (t.Value.indexOf("o") == t.Value.length - 1 && /^([0-8]*)$/.test(t.Value.substr(0, t.Value.length - 1))) {
                val = parseInt(t.Value.substr(0, t.Value.length - 1), 8);
                t.Value = (val) + "";
                t.TokenType = TokenTypes.Number;
            }
            else if (t.Value.indexOf("b") == t.Value.length - 1 && /^([0-1]*)$/.test(t.Value.substr(0, t.Value.length - 1))) {
                val = parseInt(t.Value.substr(0, t.Value.length - 1), 2);
                t.Value = (val) + "";
                t.TokenType = TokenTypes.Number;
            }
            else if (!isNaN(parseInt(t.Value))) {
                val = parseInt(t.Value);
                t.Value = (val) + "";
                t.TokenType = TokenTypes.Number;
            }
            //else if ((t.Value.indexOf("0x") == 0 ||
            //    t.Value.indexOf("-0x") == 0) ) //Number literal. Base 16 (Hex)
            //{
            //    t.TokenType = TokenType.Number;
            //    var isNeg: boolean = t.Value.indexOf("-") >= 0;

            //    //Number('x') || 0
            //    Number('x') || 0;

            //    var val: number = Convert.ToInt32(t.Value.Replace("-", "").Replace("0x", ""), 16);

            //    if (isNeg)
            //        t.Value = (val * -1) + "";
            //    else
            //        t.Value = (val) + "";

            //}
            //else if ((t.Value.indexOf("0b") == 0 ||
            //    t.Value.indexOf("-0b") == 0)) //Number literal. Base 2 (Binary)
            //{
            //    t.TokenType = TokenType.Number;
            //    var isNeg: boolean = t.Value.indexOf("-") >= 0;

            //    var val: number = Convert.ToInt32(t.Value.Replace("-", "").Replace("0b", ""), 2);

            //    if (isNeg)
            //        t.Value = (val * -1) + "";
            //    else
            //        t.Value = (val) + "";

            //}
            //else if (t.Value.indexOf(".") == -1 && (t.Value.indexOf("0") == 0 || t.Value.indexOf("-0") == 0 ||
            //    t.Value.indexOf("0o") == 0 || t.Value.indexOf("-0o") == 0))
            ////Number Literal Base 8 (Octal)
            //{
            //    t.TokenType = TokenType.Number;

            //    var isNeg: boolean = t.Value.indexOf("-") >= 0;

            //    var val: number = Convert.ToInt32(t.Value.Replace("-", "").Replace("o", ""), 8);

            //    if (isNeg)
            //        t.Value = (val * -1) + "";
            //    else
            //        t.Value = (val) + "";
            //}
            //else if (t.Value.indexOf(".") >= 0 && (t.Value.indexOf("E+") >= 0 || t.Value.indexOf("E-") >= 0)) //Todo: Check for data type of number? (int, float, double)
            //{
            //    d = double.Parse(t.Value.Replace("E", "e"));
            //    t.Value = d + "";
            //    t.TokenType = TokenType.Number;
            //}
            //else if (double.TryParse(t.Value, out d)) //Todo: Check for data type of number? (int, float, double)
            //{
            //    t.Value = d + "";
            //    t.TokenType = TokenType.Number;
            //}
            else if (Operator.Contains(Operator.Operators, t.Value)) // Check is an operator
            {
                t.TokenType = TokenTypes.Operator;

                //var skipmatches: number = -1;

                ////Because our RegEx doesn't account for multi char operators go through each following match and check to see if it's an operator as well and concat them together.
                //var next = ex.exec(scIPt);
                //while (next != null && Operator.Contains(Operator.Operators, next.toString())) {
                //    t.Value += next[0];
                //    skipmatches = next.index + 1;
                //    next = ex.exec(scIPt);
                //}

                if (t.Value == "^" || t.Value.toUpperCase() == "LENGTH")
                    t.RightAssociative = true;

                //if (skipmatches > 0)
                //    skipBeforeIndex = skipmatches;
            }
            else if (t.Value.indexOf(".") >= 0) //Case for Regex doesn't seperate "." which is important for numbers. So for Objects and properties / functions we'll do it manually.
            {
                t.TokenType = TokenTypes.Name;
                toReturn.push(t);
                continue;
            }
            //else if ((t.Value.indexOf("++") == 0 || t.Value.indexOf("--") == 0) && t.Value.length > 2) {
            //    Token pre = new Token();
            //    pre.RightAssociative = true;
            //    pre.TokenIndex = t.TokenIndex;
            //    pre.TokenLength = 2;
            //    pre.TokenType = TokenType.Operator;
            //    pre.Value = t.Value.indexOf("++") == 0 ? "++" : "--";

            //    toReturn.Add(pre);
            //    t.Value = t.Value.Substring(2);
            //    t.TokenIndex += 2;
            //    t.TokenLength = t.Value.Length;
            //    toReturn.Add(t);
            //    continue;
            //}
            //else if (t.Value.indexOf("++") == 0 || t.Value.indexOf("--") == 0 && t.Value.length > 2) {
            //    Token post = new Token();
            //    post.RightAssociative = false;
            //    post.TokenIndex = t.TokenIndex;
            //    post.TokenLength = 2;
            //    post.TokenType = TokenType.Operator;
            //    post.Value = t.Value.EndsWith("++") ? "++" : "--";

            //    t.Value = t.Value.Substring(0, t.Value.Length - 2);
            //    t.TokenIndex += 2;
            //    t.TokenLength = t.Value.Length;
            //    toReturn.Add(t);

            //    toReturn.Add(post);
            //    continue;
            //}
            // if (t.TokenType != TokenType.Comment)
            if (addComments || t.TokenType != TokenTypes.Comment)
                toReturn.push(t);
        }

        return toReturn;
    }

}

enum AddressingModes {
    //Value is in instruction
    Immediate,
    //Value in register
    Register,
    //Calculated from value and retreived from memory 
    //eg: MOV R8W, 1234[8*A+C] ; move word at address 8*A+C+1234 into R8W
    //table[B][DI]
    //table[DI][B]
    //table[B+DI]
    //[table+B+DI]
    Indirect,
    //IP-relative addressing: this is new for x64 and allows accessing data tables and such in the code relative to the 
    //current instruction pointer, making position independent code easier to implement.
    Relative,
}

class Variable {
    public Name: string;
    public Address: Long;

    //The Size of memory allocated in bytes
    public Size: number;
    //Segments are ignored in 64-bit.
    //public Segment: number;
}

class ExternalReference {
    public Name: string;
    //PROC
    public RefernceType: string;

    constructor(name: string, typ: string) {
        this.Name = name;
        this.RefernceType = typ;
    }
}

class MemoryOperation {
    public Address: Long;
    //1 Byte.
    public Data: Long;

    constructor(addr: Long, b: Long) {
        this.Address = addr;
        this.Data = b;
    }
}

class StepRecord {
    addressOfStep: number;
    regs: Registers;
    memoryOperations: MemoryOperation[]; //<int address, byte valataddress> 
    isSystemCall: boolean;

    constructor(address: number = 0, programRegisters: Registers = null, memoryChanges: MemoryOperation[] = null, IsSysCall: boolean = false) {
        this.addressOfStep = address;
        this.regs = programRegisters;
        this.memoryOperations = memoryChanges;
        this.isSystemCall = IsSysCall;
    }

    /**
     * 
     * @param address Address of byte in memory.
     * @param value Byte value.
     */
    public AddMemoryChange(address: Long, value: Long) {
        if (this.memoryOperations == null)
            this.memoryOperations = [];

        for (var i = 0; i < this.memoryOperations.length; i++) {
            if (this.memoryOperations[i].Address == address)
                this.memoryOperations[address.getLowBits()].Data = value;
            else
                this.memoryOperations.push(new MemoryOperation(address, value));
        }
    }

    public SetRegs(registers: Registers) {
        this.regs = registers.clone();
    }
}

class Rewind {
     
    private undoList: StepRecord[];

    private currStep: StepRecord;

    public Rewind() {
        this.undoList = [];
    }

    public Create() {
        this.currStep = new StepRecord();
    }

    public Commit() {
        this.undoList.push(this.currStep);
        this.currStep = null;
    }
    
    public AddMemoryChange(address: Long, data: Long) {
        if (this.currStep == null)
            return;
        this.currStep.AddMemoryChange(address, data);
    }

    public SetRegisters(regs: Registers) {
        this.currStep.SetRegs(regs);
    }
    public SetIP(instructionPointer: number) {
        this.currStep.regs.IP.E = new Long( instructionPointer);
    }

    //undo changes

    public UnWindInstruction(prog: Program): boolean {
        if (this.undoList.length == 0)
            return false;

        var lastStep: StepRecord = this.undoList.pop();

        prog.Regs = lastStep.regs;

        for (var i = 0; i < lastStep.memoryOperations.length; i++)
            prog.Mem.WriteMemory1Byte(lastStep.memoryOperations[i].Address, lastStep.memoryOperations[i].Data);
        
        return true;
    }
}

class RAM {
    public WriteCallback: Function;
    public ReadCallback: Function;

    private writecallback(offset: number, val: number) {
        if (this.WriteCallback != null)
            this.WriteCallback(offset, val);
    }

    private readcallback(offset: number, val: number) {
        if (this.ReadCallback != null)
            this.ReadCallback(offset, val);
    }

    public memory: Uint8Array;
    private undoList: Rewind = null;
    
    /**
     * All variables when initilized are written to memory and the address of the var is saved here for lookups by labels in instructions.
     */
    public Variables: Variable[] = [];
    private nextFreeAddress: Long = new Long(0x10); //Reserve first 16 addresses mostly to tell that the first var isn't just 0 for debugging.

    constructor() {
        this.memory = new Uint8Array(0xA00000);
    }

    public GetVariableAddress(variablename: string): Long {
        for (var i = 0; i < this.Variables.length; i++) {
            if (variablename == this.Variables[i].Name)
                return this.Variables[i].Address.copy();
        }
        return Long.UZERO.copy(); // -1;
    }
    public GetVariable(variablename: string): Variable {
        for (var i = 0; i < this.Variables.length; i++) {
            if (variablename == this.Variables[i].Name)
                return this.Variables[i];
        }
        return null;
    }

    public SetVariable(name: string, value: Long | string | Long[], datasize: number): Variable {
        var existing = null;
        var index = -1;
        for (var i = 0; i < this.Variables.length; i++) {
            if (name == this.Variables[i].Name) {
                existing = this.Variables[i];
                index = i;
                break;
            }
        }


        if (typeof value == "string") {
            value = StringToNumberArray(value);
        }

        var bytestowrite = datasize;

        if (Array.isArray(value)) {
            bytestowrite = datasize * value.length;
        }

        var address = this.nextFreeAddress.copy();
        var startAddress = address;

        if (index > -1) { //Var already exists. Overwrite it. Don't worry about overruns in ASM programmer has to worry. 
            this.WriteMemory(existing.Address, value, bytestowrite);
            return existing;
        }
        else {
            this.WriteMemory(address, value, datasize);
            
            this.nextFreeAddress = this.nextFreeAddress.add(new Long(bytestowrite));

            var variable = new Variable();
            variable.Name = name;
            variable.Address = startAddress;
            variable.Size = bytestowrite;
            this.Variables.push(variable);
            return variable;
        }



    }

    public ReadString(lngoffset: Long, terminatingchar: string = '\0'): string {
        var offset = lngoffset.getLowBits();

        if (offset >= this.memory.length || offset < 0)
            throw new Error("Read Memory out of bounds error!");

        var char = this.memory[offset];
        this.readcallback(offset, char);

        var str = ""

        while (char != terminatingchar.charCodeAt(0) && offset < this.memory.length) {
            str += String.fromCharCode(char);
            offset++;
            char = this.memory[offset];
            this.readcallback(offset, char);
        }
        return str;
    }

    ReadZeroTerminatedString(lngoffset: Long): string {
        var offset = lngoffset.getLowBits();

        if (offset >= this.memory.length || offset < 0)
            throw new Error("Read Memory out of bounds error!");

        var char = this.memory[offset];

        this.readcallback(offset, char);

        var str = ""

        while (char != 0 && offset < this.memory.length) {
            str += String.fromCharCode(char);
            offset++;
            char = this.memory[offset];

            this.readcallback(offset, char);

        }
        return str;
    }

    public ReadMemoryNumber(offset: Long | number, size: number): Long {
        switch (size) {
            case 1:
                return this.ReadMemory1Byte(offset);
            case 2:
                return this.ReadMemory2Bytes(offset);
            case 4:
                return this.ReadMemory4Bytes(offset);
            case 8:
                return this.ReadMemory8Bytes(offset);
        }
        throw new Error("Invalid attempt to read memory (0x" + offset.toString(16) + ") of unacceptable size: " + size + "!");
    }

    //region Read/Write Memory
    public ReadMemory1Byte(offset: Long | number): Long {
        if (offset instanceof Long)
            offset = offset.getLowBits();
        //CheckMemAccess(segment, offset, 0, false);
        //if (segments[segment] != null)

        this.readcallback(offset, this.memory[offset]);

        return new Long(this.memory[offset]);
        //return 0;
    }
    public ReadMemory2Bytes(offset: Long | number): Long {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        //CheckMemAccess(segment, offset, 0, false);
        var val = ((this.memory[offset + 1]) << 8);
        val += (this.memory[offset]);

        this.readcallback(offset + 1, ((this.memory[offset + 1]) << 8));
        this.readcallback(offset, this.memory[offset]);

        return new Long(val);
    }
    public ReadMemory4Bytes(offset: Long | number): Long {
        if (offset instanceof Long)
            offset = offset.getLowBits();
        //CheckMemAccess(segment, offset, 0, false);
        var val = ((this.memory[offset + 3]) << 24);
        val += (this.memory[offset + 2] << 16);
        val += (this.memory[offset + 1] << 8);
        val += (this.memory[offset]);

        this.readcallback(offset + 3, ((this.memory[offset + 3]) << 24));
        this.readcallback(offset + 2, (this.memory[offset + 2] << 16));
        this.readcallback(offset + 1, (this.memory[offset + 1] << 8));
        this.readcallback(offset, (this.memory[offset]));

        return new Long(val);
    }
    public ReadMemory8Bytes(offset: Long | number): Long {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        //CheckMemAccess(segment, offset, 0, false);
        var val: number[] = [
            this.memory[offset + 7] & 0xFF,
            this.memory[offset + 6] & 0xFF,
            this.memory[offset + 5] & 0xFF,
            this.memory[offset + 4] & 0xFF,

            this.memory[offset + 3] & 0xFF,
            this.memory[offset + 2] & 0xFF,
            this.memory[offset + 1] & 0xFF,
            this.memory[offset] & 0xFF,
        ];

        this.readcallback(offset + 7, val[7]);
        this.readcallback(offset + 6, val[6]);
        this.readcallback(offset + 5, val[5]);
        this.readcallback(offset + 4, val[4]);

        this.readcallback(offset + 3, val[3]);
        this.readcallback(offset + 2, val[2]);
        this.readcallback(offset + 1, val[1]);
        this.readcallback(offset, val[0]);

        return Long.fromBytes(val, true, true);
    }

    public ReadMemory16Bytes(offset: Long | number): Long[] {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        //CheckMemAccess(segment, offset, 0, false);
        var valh: number[] = [
            this.memory[offset + 15] & 0xFF,
            this.memory[offset + 14] & 0xFF,
            this.memory[offset + 13] & 0xFF,
            this.memory[offset + 12] & 0xFF,

            this.memory[offset + 11] & 0xFF,
            this.memory[offset + 10] & 0xFF,
            this.memory[offset + 9] & 0xFF,
            this.memory[offset + 8] & 0xFF,
        ];

        var vall: number[] = [
            this.memory[offset + 7] & 0xFF,
            this.memory[offset + 6] & 0xFF,
            this.memory[offset + 5] & 0xFF,
            this.memory[offset + 4] & 0xFF,

            this.memory[offset + 3] & 0xFF,
            this.memory[offset + 2] & 0xFF,
            this.memory[offset + 1] & 0xFF,
            this.memory[offset] & 0xFF,
        ];

        this.readcallback(offset + 15, valh[7]);
        this.readcallback(offset + 14, valh[6]);
        this.readcallback(offset + 13, valh[5]);
        this.readcallback(offset + 12, valh[4]);

        this.readcallback(offset + 11, valh[7]);
        this.readcallback(offset + 10, valh[6]);
        this.readcallback(offset + 9, valh[5]);
        this.readcallback(offset + 8, valh[4]);

        this.readcallback(offset + 7, vall[7]);
        this.readcallback(offset + 6, vall[6]);
        this.readcallback(offset + 5, vall[5]);
        this.readcallback(offset + 4, vall[4]);

        this.readcallback(offset + 3, vall[3]);
        this.readcallback(offset + 2, vall[2]);
        this.readcallback(offset + 1, vall[1]);
        this.readcallback(offset, vall[0]);

        return [Long.fromBytes(valh, true, true), Long.fromBytes(vall, true, true)];
    }

    public WriteMemory(offset: Long, Value: Long | string | Long[], size: number, isUndo: boolean = false) {
        if (Array.isArray(Value) && Value[0] instanceof Long)
            this.WriteMemoryArray(offset, Value, size, isUndo);
        else if (Value instanceof Long)
            this.WriteMemoryNumber(offset, Value, size, isUndo);
        else if (typeof Value == "string")
            this.WriteMemory(offset, StringToNumberArray(Value), 2, isUndo);
    }


    /**
     * Write an array of numbers to memory.
     * @param offset Offset address in memory to write to.
     * @param Value The arry of numbers to wrtire
     * @param size The data size of the numbers. This refers to the size of the numbers in the array not the size of the array.
     * @param isUndo Save undo data.
     */
    public WriteMemoryArray(offset: Long | number, Value: Long[], size: number, isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        for (var i = 0; i < Value.length; i++) {
            switch (size) {
                case 1:
                    this.WriteMemory1Byte(offset + i, Value[i], isUndo);
                    break;
                case 2:
                    this.WriteMemory2Bytes(offset + (i * 2), Value[i], isUndo);
                    break;
                case 4:
                    this.WriteMemory4Bytes(offset + (i * 4), Value[i], isUndo);
                    break;
                case 8:
                    this.WriteMemory8Bytes(offset + (i * 8), Value[i], isUndo);
                    break;
                default:
                    this.WriteMemory1Byte(offset + i, Value[i], isUndo);
                    break;
            }
        }
    }

    public WriteMemoryNumber(offset: Long | number, Value: Long | number, size: number, isUndo: boolean = false) {
        switch (size) {
            case 1:
                this.WriteMemory1Byte(offset, Value, isUndo);
                break;
            case 2:
                this.WriteMemory2Bytes(offset, Value, isUndo);
                break;
            case 4:
                this.WriteMemory4Bytes(offset, Value, isUndo);
                break;
            case 8:
                this.WriteMemory8Bytes(offset, Value, isUndo);
                break;
            default:
                this.WriteMemory1Byte(offset, Value, isUndo);
                break;
        }
    }

    public WriteMemory1Byte(offset: Long | number, Value: Long | number, isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        if (Value instanceof Long)
            Value = Value.getLowBits();

        //CheckMemAccess(segment, offset, (uint)Value, true);
        if (this.undoList != null && !isUndo)
            this.undoList.AddMemoryChange(new Long(offset), new Long(this.memory[offset]));
        this.memory[offset] = Value;
        this.writecallback(offset, Value);
    }

    public WriteMemoryByteArray(offset: Long | number, Values: Long[] | number[], isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();
        //CheckMemAccess(segment, offset, (uint)Values[0], true);
        for (var i = 0; i < Values.length; i++) {
            var val = Values[i];
            if (val instanceof Long)
                val = val.getLowBits();

            if (this.undoList != null && !isUndo)
                this.undoList.AddMemoryChange(new Long(offset + i), new Long(this.memory[offset + i]));
            this.memory[offset + i] = val & 0xFF;
            this.writecallback(offset, val);
        }
    }

    public WriteMemory2Bytes(offset: Long | number, Value: Long | number, isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        if (Value instanceof Long)
            Value = Value.getLowBits();

        //CheckMemAccess(segment, offset, (uint)Value, true);
        if (this.undoList != null && !isUndo) {
            this.undoList.AddMemoryChange(new Long(offset + 1), new Long(this.memory[offset + 1]));
            this.undoList.AddMemoryChange(new Long(offset), new Long(this.memory[offset]));
        }
        this.memory[offset + 1] = (Value >> 8) & 0xFF;
        this.memory[offset] = (Value & 0xFF);


        this.writecallback(offset + 1, (Value >> 8) & 0xFF);
        this.writecallback(offset, Value & 0xFF);
    }
    public WriteMemory4Bytes(offset: Long | number, Value: Long | number, isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        if (Value instanceof Long)
            Value = Value.getLowBits();

        //CheckMemAccess(segment, offset, Value, true);
        if (this.undoList != null && !isUndo) {
            this.undoList.AddMemoryChange(new Long(offset + 3), new Long( this.memory[offset + 3]));
            this.undoList.AddMemoryChange(new Long(offset + 2), new Long(this.memory[offset + 2]));
            this.undoList.AddMemoryChange(new Long(offset + 1), new Long(this.memory[offset + 1]));
            this.undoList.AddMemoryChange(new Long(offset), new Long(this.memory[offset]));
        }

        this.memory[offset + 3] = (Value >> 24) & 0xFF;
        this.memory[offset + 2] = (Value >> 16) & 0xFF;
        this.memory[offset + 1] = (Value >> 8) & 0xFF;
        this.memory[offset] = (Value & 0xFF);


        this.writecallback(offset + 3, (Value >> 24) & 0xFF);
        this.writecallback(offset + 2, (Value >> 16) & 0xFF);
        this.writecallback(offset + 1, (Value >> 8) & 0xFF);
        this.writecallback(offset, Value & 0xFF);
    }

    public WriteMemory8Bytes(offset: Long | number, Value: Long | number, isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        var valArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

        if (Value instanceof Long)
            valArr = Value.toBytes(true);
        else {
            valArr[offset + 7] = (Value >> 56) & 0xFF;
            valArr[offset + 6] = (Value >> 48) & 0xFF;
            valArr[offset + 5] = (Value >> 40) & 0xFF;
            valArr[offset + 4] = (Value >> 32) & 0xFF;
            valArr[offset + 3] = (Value >> 24) & 0xFF;
            valArr[offset + 2] = (Value >> 16) & 0xFF;
            valArr[offset + 1] = (Value >> 8) & 0xFF;
            valArr[offset] = (Value & 0xFF) & 0xFF;
        }
        //CheckMemAccess(segment, offset, Value, true);
        if (this.undoList != null && !isUndo) {
            this.undoList.AddMemoryChange(new Long(offset + 3), new Long(this.memory[offset + 3]));
            this.undoList.AddMemoryChange(new Long(offset + 2), new Long(this.memory[offset + 2]));
            this.undoList.AddMemoryChange(new Long(offset + 1), new Long(this.memory[offset + 1]));
            this.undoList.AddMemoryChange(new Long(offset), new Long(this.memory[offset]));
        }


        this.memory[offset + 7] = valArr[7]; // (Value >> 56);
        this.memory[offset + 6] = valArr[6]; //(Value >> 48);
        this.memory[offset + 5] = valArr[5]; //(Value >> 40);
        this.memory[offset + 4] = valArr[4]; //(Value >> 32);
        this.memory[offset + 3] = valArr[3]; //(Value >> 24);
        this.memory[offset + 2] = valArr[2]; //(Value >> 16);
        this.memory[offset + 1] = valArr[1]; //(Value >> 8);
        this.memory[offset] = valArr[0]; //(Value & 0xFF);

        this.writecallback(offset + 7, valArr[7]); //Value >> 56);
        this.writecallback(offset + 6, valArr[6]); //Value >> 48);
        this.writecallback(offset + 5, valArr[5]); //Value >> 40);
        this.writecallback(offset + 4, valArr[4]); //Value >> 32);
        this.writecallback(offset + 3, valArr[3]); //Value >> 24);
        this.writecallback(offset + 2, valArr[2]); //Value >> 16);
        this.writecallback(offset + 1, valArr[1]); //Value >> 8);
        this.writecallback(offset, valArr[0]); //Value & 0xFF);
    }

    public WriteMemory16Bytes(offset: Long | number, ValueH: Long, ValueL: Long, isUndo: boolean = false) {
        if (offset instanceof Long)
            offset = offset.getLowBits();

        var valArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

           valArr = ValueH.toBytes(true).concat(ValueL.toBytes(true));
        
        //CheckMemAccess(segment, offset, Value, true);
        if (this.undoList != null && !isUndo) {
            this.undoList.AddMemoryChange(new Long(offset + 3), new Long(this.memory[offset + 3]));
            this.undoList.AddMemoryChange(new Long(offset + 2), new Long(this.memory[offset + 2]));
            this.undoList.AddMemoryChange(new Long(offset + 1), new Long(this.memory[offset + 1]));
            this.undoList.AddMemoryChange(new Long(offset), new Long(this.memory[offset]));
        }


        this.memory[offset + 7] = valArr[7]; // (Value >> 56);
        this.memory[offset + 6] = valArr[6]; //(Value >> 48);
        this.memory[offset + 5] = valArr[5]; //(Value >> 40);
        this.memory[offset + 4] = valArr[4]; //(Value >> 32);
        this.memory[offset + 3] = valArr[3]; //(Value >> 24);
        this.memory[offset + 2] = valArr[2]; //(Value >> 16);
        this.memory[offset + 1] = valArr[1]; //(Value >> 8);
        this.memory[offset] = valArr[0]; //(Value & 0xFF);

        this.writecallback(offset + 7, valArr[7]); //Value >> 56);
        this.writecallback(offset + 6, valArr[6]); //Value >> 48);
        this.writecallback(offset + 5, valArr[5]); //Value >> 40);
        this.writecallback(offset + 4, valArr[4]); //Value >> 32);
        this.writecallback(offset + 3, valArr[3]); //Value >> 24);
        this.writecallback(offset + 2, valArr[2]); //Value >> 16);
        this.writecallback(offset + 1, valArr[1]); //Value >> 8);
        this.writecallback(offset, valArr[0]); //Value & 0xFF);
    }
    
}

class Program {
    public Mem: RAM;
    public Regs: Registers;

    private stript: string;

    public StackSize: number = 64;
    public OperandSize: number = 64;

    /** During compile of Execution if an Error is thrown this will contain the nearest token used to calculate GetErrorLine() */
    public failedToken: Token = null;

    public GetErrorLine() : number {
        if (this.failedToken == null)
            return -1;
        var lineNumber = this.stript.substr(0, this.failedToken.TokenIndex).split("\n").length;

        return lineNumber;
    }

    public Tokens: Token[] = [];

    public preInstructionCallback: Function;
    public postInstructionCallback: Function;

    public EndFunction: boolean;
    public End: boolean;
    public IsWaiting: boolean;
    public WaitResult: Function;

    public ExternalReferences: ExternalReference[] = [];
    
    public InstructionCount: number = 0xA0000; //2k below stack... Technically a stack can overrun the code

   /**
     * The Actual Code. As its been interpreted. 
     */
    public Instructions: Statement[] = [];
    ///Stores references to Labels and Function declaration addresses (Index of Instruction).
    public Labels: Variable[] = [];
    
    constructor(scIPt: string, preEvalCallback: Function = function () { }, postEvalCallback: Function = function (obj: Statement, result: EvaluatedResult) { }, memwritescallback: Function = null, memreadscallback: Function = null) {
        this.Regs = new Registers();
        this.Mem = new RAM();
        
        this.Mem.WriteCallback = memwritescallback;
        this.Mem.ReadCallback = memreadscallback;
        this.preInstructionCallback = preEvalCallback;
        this.postInstructionCallback = postEvalCallback;

        this.stript = scIPt;
        this.InitinterruptTable();
        //this.Initilize(scIPt);
    }
    
    public GetLabel(labelname: string): Variable {
        for (var i = 0; i < this.Labels.length; i++) {
            if (labelname == this.Labels[i].Name)
                return this.Labels[i];
        }
        return null;
    }

    public Step(): boolean {

        if (this.End)
            return false;

        if (this.IsWaiting)
            return true;
        //if (this.WaitResult != null) {
        //    this.WaitResult(this);
        //    this.WaitResult = null;
        //}

        var ip = this.Regs.IP.E;
        if (this.Instructions[ip.getLowBits()]) {
            this.Instructions[ip.getLowBits()].Evaluate();
        }
        else {
            return false;
        }
        if (ip.equals( this.Regs.IP.E))
            this.Regs.IP.E = this.Regs.IP.E.add(new Long(4));

        return true;
    }

    public Initilize(scIPt: string = this.stript) {
        var tokenizer = new Tokenizer();
        this.Tokens = tokenizer.Tokenize(scIPt);

        this.Regs.SP.E = new Long(this.Mem.memory.length);
        this.Regs.BP.E = new Long(this.Mem.memory.length);
        this.Regs.IP.E = new Long(this.InstructionCount);

        var ins = this.Build(this.Tokens);

        if (ins.length == 1 && ins[0] instanceof BlockStatement) {
            ins = (ins[0] as BlockStatement).Statements;
        }

        for (var i = 0; i < ins.length; i++) {
            this.Instructions[ins[i].Address.getLowBits()] = ins[i];
        }
    }

    index :number = 0;
    private Build(input: Token[], breakonclosing: string = "", openingmatch: string = "", breakonEOS: boolean = true, breakontoken: string[] = null): Statement[]
    {

        var bs: BlockStatement = new BlockStatement(this.preInstructionCallback, this.postInstructionCallback, null, this);

        var operatorStack: Token[] = [];
        var operandStack: Token[] = [];

        var countMatching: number = 0;

        var breakloop: Boolean = false;

        if (breakontoken == null)
            breakontoken = [];


        while (this.index < input.length) {
            this.failedToken = input[this.index];

            var c: Token = input[this.index];
            var popped: Token = null;

            if (breakontoken.indexOf(c.Value) >= 0)
                break;
            else if (c.Value == breakonclosing) {
                countMatching--;
                if (countMatching <= 0)
                    break;
            }
            else if (c.Value == openingmatch)
                countMatching++;
            else if (input[this.index].TokenType == TokenTypes.Comment)
                continue;
            else if (input[this.index].TokenType == TokenTypes.Mnemonic) {
                this.failedToken = input[this.index];
                throw new Error("Unexpected Instruction near: " + this.failedToken.Value + "\nLine: " + this.GetErrorLine());
                //bs.Statements.push(this.BuildMnemonic(input));
            }
            else if (input[this.index].TokenType == TokenTypes.Keyword) {
                var result = this.BuildKeyword(input);

                if (result != null)
                   bs.Statements.push(result);
            }
            else if (input[this.index].TokenType == TokenTypes.Label)
                bs.Statements.push(this.BuildLabel(input));
            else if (input[this.index].TokenType == TokenTypes.Name)
                bs.Statements.push(this.BuildIdentifier(input));
            //else if (input[this.index].TokenType == TokenType.Number)
            //    bs.Statements.push(this.BuildNumber(input));
            //else if (input[this.index].TokenType == TokenType.String)
            //    bs.Statements.push(this.BuildString(input));
            //else if (input[this.index].TokenType == TokenType.Operator)
            //    bs.Statements.push(this.BuildOperator(input));
            //else if (input[this.index].TokenType == TokenType.Punctuator)
            //    bs.Statements.push(this.BuildPunctuator(input));

            else
                //switch (c.Value) {
                //    case "(":
                //        operatorStack.push(c);
                //        break;
                //    case ")":
                //}

                this.index++;


        }

        this.failedToken = null;

        return bs.Statements;
    }
    
    /** 
     * @param input
     */
    public BuildAST(input: Token[]): Statement {

        var bs: BlockStatement = new BlockStatement(this.preInstructionCallback, this.postInstructionCallback, null, this);

        var operatorStack: Token[] = [];
        var operandStack: Statement[] = [];

        var keepGoing: boolean = true;
        
        while (this.index < input.length && keepGoing) {
            var lastToken = input[this.index - 1];
            var c: Token = input[this.index];
            var popped: Token = null;

            var nextValue: Token = Program.Peek(input, this.index);

            if (c.TokenType == TokenTypes.Mnemonic ||
                c.Value == "," ||
                (nextValue && nextValue.Value == ":") //Next value is a label (Could be a segment override but we don't use those)...
            ) {
                break;
            }


            if (lastToken.TokenType == TokenTypes.Number && (c.TokenType == TokenTypes.Label || c.TokenType == TokenTypes.Name))
                break;
            //if (lastToken.TokenType == TokenTypes.Number && (c.TokenType == TokenTypes.Label || c.TokenType == TokenTypes.Name))
            //    break;

            switch (c.TokenType) {
                case TokenTypes.Comment:
                    this.index++;
                    continue;
                //case TokenTypes.Mnemonic: //Next statement
                case TokenTypes.Keyword: //Shouldn't hit this.
                    keepGoing = false;
                    break;
                case TokenTypes.Operator:
                case TokenTypes.Punctuator:
                    switch (c.Value) {
                        case "(":
                        case "[":
                            operatorStack.push(c);
                            break;
                        case ")":
                        case "]":
                            while (operatorStack.length > 0) {
                                popped = operatorStack.pop();
                                if (popped.Value == "(" || popped.Value == "[") {
                                    break;
                                    //continue main;
                                }
                                else {
                                    this.addNode(operandStack, popped, this);
                                }
                            }
                        default:

                            if (Operator.Contains(Operator.Operators, c.Value)) {
                                var o1: Operator = Operator.Get(Operator.Operators, c.Value);
                                var o2: Operator;
                                while (operatorStack.length > 0 && null != (o2 =
                                    Operator.Get(Operator.Operators, operatorStack[operatorStack.length - 1].Value))) {
                                    if ((o1.AssociativeDirection != AssociativeDirections.Right &&
  0 == o1.ComparePrecedence(o2)) ||
  o1.ComparePrecedence(o2) < 0) {
  this.addNode(operandStack, operatorStack.pop(), this);
                                    }
                                    else {
  break;
                                    }
                                }
                                operatorStack.push(c);
                            }
                    }
                    this.index++;
                    break;
                case TokenTypes.Number:
                    operandStack.push(new NumberValue(this.preInstructionCallback, this.postInstructionCallback, c, this));
                    this.index++;
                    break;
                case TokenTypes.String:
                    operandStack.push(new StringValue(this.preInstructionCallback, this.postInstructionCallback, c, this));
                    this.index++;
                    break;
                case TokenTypes.Label:
                    operandStack.push(new IdentifierStatement(this.preInstructionCallback, this.postInstructionCallback, c, this));
                    this.index++;
                    break;
                case TokenTypes.Name:
                    operandStack.push(new IdentifierStatement(this.preInstructionCallback, this.postInstructionCallback, c, this));
                    this.index++;

                    if (nextValue == null || nextValue.TokenType == TokenTypes.Name) //Off case where a call to label is followed by a label statement. 
                        keepGoing = false;
                    break;
            }
        }

        while (operatorStack.length > 0) {
            this.addNode(operandStack, operatorStack.pop(), this);
        }

        if (bs.Statements.length == 0 && operandStack.length == 1) {
            return operandStack.pop();
        }
        else {
            var reverseStack: Statement[] = [];
            while (operandStack.length > 0) {
                reverseStack.push(operandStack.pop());
            }

            while (reverseStack.length > 0) {
                bs.Statements.push(reverseStack.pop());
            }
            return bs;
        }
    }

    private addNode(stack: Statement[], t: Token, env: Program) {
        var rightASTNode: Statement = null;
        var leftASTNode: Statement = null;
        if (stack.length > 0)
            rightASTNode = stack.pop();
        if (stack.length > 0)
            leftASTNode = stack.pop();

        if (t.RightAssociative)
            stack.push(new OperationExpression(this.preInstructionCallback, this.postInstructionCallback, t, env, rightASTNode, leftASTNode));
        else
            stack.push(new OperationExpression(this.preInstructionCallback, this.postInstructionCallback, t, env, leftASTNode, rightASTNode));
    }

    private static Peek(input: Token[], idx: number): Token {
        if (input == null)
            return null;
        if (idx + 1 >= input.length)
            return null;

        return input[idx + 1];

    }

    private PeekValue(input: Token[], idx: number): string {
        var t: Token = Program.Peek(input, idx);
        if (t != null)
            return t.Value;
        return "";
    }

    //private BuildMnemonic(tokens: Token[]): Statement {
    //    var mnemonic = tokens[this.index++].Value.toUpperCase();

    //    var result: Statement = this.mnemonicBuilders[mnemonic](this, tokens);
    //    return result;
    //}
    private BuildKeyword(tokens: Token[]): Statement {
        var currentToken = tokens[this.index];
        var val = currentToken.Value.toLowerCase();

        this.index++;

        switch (val) {
            case ".data": //Data block.
                this.ProcessDataBlock(tokens);
                break;
            case ".code":
                var bs = new BlockStatement(this.preInstructionCallback, this.postInstructionCallback, currentToken, this);
                bs.Statements = this.ProcessCodeBlock(tokens);
                return bs;
                break;
            case "extrn": //Meant to call system functions
                var externName = tokens[this.index++].Value; //Name
                this.index++ // s/b ":"
                var externType = tokens[this.index++].Value; //Type

                this.ExternalReferences.push(new ExternalReference(externName, externType));
                break;
            case "start": //Function start
                break;
        }

        return null;
    }
    private BuildLabel(tokens: Token[]): Statement {
        this.failedToken = tokens[this.index];
        throw new Error("Label: Unexpected Token near: " + this.failedToken.Value + "\nLine: " + this.GetErrorLine());
    }
    private BuildIdentifier(tokens: Token[]): Statement {
        this.failedToken = tokens[this.index];
        throw new Error("Identifier: Unexpected Token near: " + this.failedToken.Value + "\nLine: " + this.GetErrorLine());
    }

    private ProcessDataBlock(tokens: Token[]) {
        while (tokens.length > this.index && tokens[this.index].TokenType == TokenTypes.Name) {

            var name = tokens[this.index++].Value; //.toLowerCase();
            var stSIze = tokens[this.index++].Value.toLowerCase();

            var size = 1;

            /*    db      0x55                ; just the byte 0x55
        db      0x55,0x56,0x57      ; three bytes in succession
        db      'a',0x55            ; character constants are OK
        db      'hello',13,10,'$'   ; so are string constants
        dw      0x1234              ; 0x34 0x12
        dw      'A'                 ; 0x41 0x00 (it's just a number)
        dw      'AB'                ; 0x41 0x42 (character constant)
        dw      'ABC'               ; 0x41 0x42 0x43 0x00 (string)
        dd      0x12345678          ; 0x78 0x56 0x34 0x12
        dq      0x1122334455667788  ; 0x88 0x77 0x66 0x55 0x44 0x33 0x22 0x11
        ddq     0x112233445566778899aabbccddeeff00
        ; 0x00 0xff 0xee 0xdd 0xcc 0xbb 0xaa 0x99
        ; 0x88 0x77 0x66 0x55 0x44 0x33 0x22 0x11
        do     0x112233445566778899aabbccddeeff00 ; same as previous
        dd      1.234567e20         ; floating-point constant
        dq      1.234567e20         ; double-precision float
        dt      1.234567e20         ; extended-precision float
        */
            switch (stSIze.toLowerCase()) {
                default:
                case "db":
                    size = 1;
                    break;
                case "dw":
                    size = 2;
                    break;
                case "dd":
                    size = 4;
                    break;
                case "dq":
                    size = 8;
                    break;
                case "ddq":
                case "do":
                    size = 16;
                    break;
                case "dt": //80-bit
                    size = 10;
                    break;
            }

            var values: Long[] = this.GetInitialValue(this.Tokens, size);
           // this.index++;

            this.Mem.SetVariable(name, values, size);
        }
    }

    private GetInitialValue(tokens: Token[], size: number): Long[] {
        var values: Long[] = [];

        do {
            if (tokens[this.index].Value == ",")
                this.index++;

            if (tokens[this.index + 1].Value.toUpperCase() == "DUP") {
                values = values.concat(this.DUP(tokens, size));
            }
            else {
                var currentToken = tokens[this.index];
                var value = currentToken.Value;

                if (currentToken.TokenType == TokenTypes.Number || value.indexOf("?") >= 0) {
                    values.push(this.parseNumber(value, size));
                }
                else if (currentToken.TokenType == TokenTypes.String) {
                    values = values.concat(values, StringToNumberArray(value));
                }
            }
            this.index++;
        } while (tokens[this.index].Value == ",")

        return values;
    }

    private parseNumber(value: string, size: number): Long {
        var lvalue: Long;

        if (value.indexOf("?") >= 0) //Dumps random garbage into 
        {
            var randLong = Long.UZERO;
            for (var i = 0; i < size; i++) {
                var rand = Math.floor((Math.random() * 0xFF));
                randLong = randLong.shiftLeft(8).or(new Long(rand));
            }

            lvalue = (randLong);
        }
        else if (value.indexOf("0x") == 0)
            lvalue = (Long.fromString(value.substr(2), true, 16));
        else if (value.indexOf("h") == value.length - 1 && !Registers.IsRegister(value)) {
            lvalue = (Long.fromString(value.substr(0, value.length - 1), true, 16));
        }
        else if (value.indexOf("o") == value.length - 1) {
            lvalue = (Long.fromString(value.substr(0, value.length - 1), true, 8));
        }
        else if (value.indexOf("b") == value.length - 1) {
            lvalue = (Long.fromString(value.substr(0, value.length - 1), true, 2));
        }
        else
            lvalue = (Long.fromString(value));

        return lvalue;
    }

    private DUP(tokens: Token[], size: number): Long[] {
        //text DB 10 DUP (’W’)
        //4 DUP(3 DUP (’l’),2 DUP (’|’),5 DUP (’I’))

        var strDupCount = tokens[this.index++].Value;
        var dupCount = this.parseNumber(strDupCount, 0);
        
        if (dupCount == null || dupCount.equals(Long.UZERO)) {
            this.failedToken = tokens[this.index];
            throw new Error("Error Processing DUP initilizer " + this.failedToken.Value + "\nLine: " + this.GetErrorLine());
        }
        
        this.index++; //Skip DUP value... Could have a sanity check here
        this.index++; //Skip '(' value... Could have a sanity check here

        var values = this.GetInitialValue(tokens, size);
        //this.index++; //Skip ')' value... Could have a sanity check here

        var toreturn: Long[] = [];

        do {
            toreturn = toreturn.concat(values);
            dupCount = dupCount.decrement();
        } while (!dupCount.equals(Long.UZERO))
        
        //for (var i = 0; i < dupCount.getLowBits(); i++) {
        //    toreturn = toreturn.concat(toreturn, values);
        //}

        return toreturn;
    }

    private ProcessCodeBlock(tokens: Token[]): Statement[] {
        /*
         start:
	mov	ah, 09h   ; Display the message
	lea	dx, msg
	int	21h
	mov	ax, 4C00h  ; Terminate the executable
	int	21h

end start
         */
        var toReturn:Statement[] = [];

        while (tokens.length > this.index) {

            var currToken: Token = tokens[this.index];
            var tokenValue = tokens[this.index].Value.toUpperCase();
            if (currToken.TokenType == TokenTypes.Name) {
                //Start of Procedure or Label. 
                //For now treat as same and simplify PROC garbage that's not applicable to us.
                //start:
                //label PROC [[distance = NEAR|FAR ]] [[langtype]] [[visibility]] [[<prologuearg>]] [[USES reglist]] [[, parameter [[:tag]]]] ...

                var name = tokens[this.index++].Value;
                
                var colonorproc = tokens[this.index++].Value.toUpperCase();
                var size = 1;
                var ref = new Variable();
                ref.Address = new Long(this.InstructionCount);
                ref.Name = name;
                ref.Size = 0;

                if (this.Regs.IP.E.equals(Long.ZERO) &&
                    (name.toUpperCase() == "BEGIN" ||
                    name.toUpperCase() == ".BEGIN" ||
                    name.toUpperCase() == ".START" ||
                    name.toUpperCase() == "START"
                    )) {
                    this.Regs.IP.E = ref.Address;
                }

                if (colonorproc.toUpperCase() != "ENDP") //TODO: Add a dealy to update the size of procedure. 
                    this.Labels.push(ref);

                if (colonorproc == "PROC") {
                    while (tokens[this.index].TokenType != TokenTypes.Keyword &&
                        tokens[this.index].TokenType != TokenTypes.Mnemonic)
                        this.index++;
                }

            }
                        else if (currToken.TokenType == TokenTypes.Mnemonic) {
                //Start of instruction
                var mnemonic = tokens[this.index++].Value.toUpperCase();


                if (!this.mnemonicBuilders[mnemonic]) {
                    this.failedToken = tokens[this.index - 1];
                    throw new Error("Operand (" + mnemonic + ") not Implemented! near: " + this.failedToken.Value + "\nLine: " + this.GetErrorLine());
                }

                var ins: Statement = this.mnemonicBuilders[mnemonic](this, tokens);

                ins.Address = new Long(this.InstructionCount);
                this.InstructionCount += 4;
                ///TODO: Write OP Codes to memory
                toReturn.push(ins);

            }
            else {
                this.index++;

                if (currToken.Value != "ENDP" && currToken.Value != "PROC")
                    break;
            }
        }
        return toReturn;
    }

    mnemonicBuilders: { [mnemonic: string]: Function; } = {
        "AAA": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (AAA) not valid in 64-bit mode :`("); },
        "AAD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (AAD) not valid in 64-bit mode :`("); },
        "AAM": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (AAM) not valid in 64-bit mode :`("); },
        "AAS": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (AAS) not valid in 64-bit mode :`("); },
        "ADC": function (prog: Program, tokens: Token[]): Statement { return new ADC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "ADD": function (prog: Program, tokens: Token[]): Statement { return new ADD(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "AND": function (prog: Program, tokens: Token[]): Statement { return new AND(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "ARPL": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (ARPL) not valid in 64-bit mode :`("); },
        "BOUND": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (BOUND) not valid in 64-bit mode :`("); },
        "BSF": function (prog: Program, tokens: Token[]): Statement { return new BSF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "BSR": function (prog: Program, tokens: Token[]): Statement { return new BSR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "BSWAP": function (prog: Program, tokens: Token[]): Statement { return new BSWAP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "BT": function (prog: Program, tokens: Token[]): Statement { return new BT(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "BTR": function (prog: Program, tokens: Token[]): Statement { return new BTR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "BTS": function (prog: Program, tokens: Token[]): Statement { return new BTS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CALL": function (prog: Program, tokens: Token[]): Statement { return new CALL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CALLF": function (prog: Program, tokens: Token[]): Statement { return new CALL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CBW": function (prog: Program, tokens: Token[]): Statement { return new SignExtendStatement(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "CDQE": function (prog: Program, tokens: Token[]): Statement { return new SignExtendStatement(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "CDQ": function (prog: Program, tokens: Token[]): Statement { return new SignExtendStatement(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 0x40); },
        "CLAC": function (prog: Program, tokens: Token[]): Statement { return new CLAC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CLC": function (prog: Program, tokens: Token[]): Statement { return new CLC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CLD": function (prog: Program, tokens: Token[]): Statement { return new CLD(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CLI": function (prog: Program, tokens: Token[]): Statement { return new CLI(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CLTS": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand CLTS is invalid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "CMC": function (prog: Program, tokens: Token[]): Statement { return new CMC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CMOVA": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVA"); },
        "CMOVAE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVAE"); },
        "CMOVB": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVB"); },
        "CMOVBE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVBE"); },
        "CMOVC": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVC"); },
        "CMOVE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVE"); },
        "CMOVG": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVG");},
        "CMOVGE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVGE"); },
        "CMOVL": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVL"); },
        "CMOVLE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVLE"); },
        "CMOVNA": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNA"); },
        "CMOVNAE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNAE");},
        "CMOVNB": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNB");},
        "CMOVNBE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNBE");},
        "CMOVNC": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNC"); },
        "CMOVNE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNE"); },
        "CMOVNG": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNG"); },
        "CMOVNGE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNGE"); },
        "CMOVNL": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNL"); },
        "CMOVNLE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNLE"); },
        "CMOVNO": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNO"); },
        "CMOVNP": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNP");},
        "CMOVNS": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNS"); },
        "CMOVNZ": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVNZ"); },
        "CMOVO": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVO"); },
        "CMOVP": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVP"); },
        "CMOVPE": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVPE"); },
        "CMOVPO": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVPO");},
        "CMOVS": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVS"); },
        "CMOVZ": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "CMOVZ"); },
        "CMP": function (prog: Program, tokens: Token[]): Statement { return new CMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CMPS": function (prog: Program, tokens: Token[]): Statement { return new CMPS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "CMPSB": function (prog: Program, tokens: Token[]): Statement { return new CMPS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "CMPSW": function (prog: Program, tokens: Token[]): Statement { return new CMPS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "CMPSD": function (prog: Program, tokens: Token[]): Statement { return new CMPS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "CMPSQ": function (prog: Program, tokens: Token[]): Statement { return new CMPS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "CMPXCHG": function (prog: Program, tokens: Token[]): Statement { return new CMPXCHG(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 0); },
        "CMPXCHG16B": function (prog: Program, tokens: Token[]): Statement { return new CMPXCHG(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 16); },
        "CMPXCHG8B": function (prog: Program, tokens: Token[]): Statement { return new CMPXCHG(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "CPUID": function (prog: Program, tokens: Token[]): Statement { return new CPUID(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "CQO": function (prog: Program, tokens: Token[]): Statement { return new SignExtendStatement(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 0x80); },
        "CWD": function (prog: Program, tokens: Token[]): Statement { return new SignExtendStatement(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 0x20); },
        "CWDE": function (prog: Program, tokens: Token[]): Statement { return new SignExtendStatement(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "DAA": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (DAA) not valid in 64-bit mode :`("); },
        "DAS": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (DAS) not valid in 64-bit mode :`("); },
        "DEC": function (prog: Program, tokens: Token[]): Statement { return new DEC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "DIV": function (prog: Program, tokens: Token[]): Statement { return new DIV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "END": function (prog: Program, tokens: Token[]): Statement { return new END(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "ENTER": function (prog: Program, tokens: Token[]): Statement { return new ENTER(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        //"ESC": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "FWAIT": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "IDIV": function (prog: Program, tokens: Token[]): Statement { return new IDIV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "IMUL": function (prog: Program, tokens: Token[]): Statement { return new IMUL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "INC": function (prog: Program, tokens: Token[]): Statement { return new INC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "INS": function (prog: Program, tokens: Token[]): Statement { return new INS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "INSB": function (prog: Program, tokens: Token[]): Statement { return new INS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "INSW": function (prog: Program, tokens: Token[]): Statement { return new INS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "INSD": function (prog: Program, tokens: Token[]): Statement { return new INS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "INT": function (prog: Program, tokens: Token[]): Statement { return new INT(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "INT1": function (prog: Program, tokens: Token[]): Statement { return new INT(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "INTO": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (INTO) not valid in 64-bit mode :`("); },
        "INVD": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "INVLPG": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "JMP": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, null);  },
        "JA": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JA");},
        "JAE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JAE"); },
        "JB": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JB"); },
        "JBE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JBE"); },
        "JC": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JC"); },
        "JE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JE"); },
        "JECXZ": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JECXZ"); },
        "JG": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JG"); },
        "JGE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JGE"); },
        "JL": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JL"); },
        "JLE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JLE"); },
        "JMPF": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JMPF"); },
        "JNA": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNA"); },
        "JNAE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNAE");},
        "JNB": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNB"); },
        "JNBE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNBE"); },
        "JNC": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNC"); },
        "JNE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNE"); },
        "JNG": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNG"); },
        "JNGE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNGE"); },
        "JNL": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNL"); },
        "JNLE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNLE"); },
        "JNO": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNO"); },
        "JNP": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNP"); },
        "JNS": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNS"); },
        "JNZ": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JNZ"); },
        "JO": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JO"); },
        "JP": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JP"); },
        "JPE": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JPE"); },
        "JPO": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JPO"); },
        "JCXZ": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JCXZ"); },
        "JS": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JS"); },
        "JZ": function (prog: Program, tokens: Token[]): Statement { return new JMP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "JZ"); },
        "HLT": function (prog: Program, tokens: Token[]): Statement { return new HLT(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LAHF": function (prog: Program, tokens: Token[]): Statement { return new LAHF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LAR": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LAR) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "LDS": function (prog: Program, tokens: Token[]): Statement { return new IgnoredInstruction(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LEA": function (prog: Program, tokens: Token[]): Statement { return new LEA(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LEAVE": function (prog: Program, tokens: Token[]): Statement { return new LEAVE(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LES": function (prog: Program, tokens: Token[]): Statement { return new IgnoredInstruction(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LFS": function (prog: Program, tokens: Token[]): Statement { return new IgnoredInstruction(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LGDT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LGDT) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "LGS": function (prog: Program, tokens: Token[]): Statement { return new IgnoredInstruction(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LIDT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LIDT) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "LLDT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LLDT) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "LMSW": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LMSW) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "LOCK": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LODS": function (prog: Program, tokens: Token[]): Statement { return new LODS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "LODSB": function (prog: Program, tokens: Token[]): Statement { return new LODS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "LODSW": function (prog: Program, tokens: Token[]): Statement { return new LODS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "LODSD": function (prog: Program, tokens: Token[]): Statement { return new LODS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "LODSQ": function (prog: Program, tokens: Token[]): Statement { return new LODS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "LOOP": function (prog: Program, tokens: Token[]): Statement { return new LOOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, null); },
        "LOOPE": function (prog: Program, tokens: Token[]): Statement { return new LOOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "LOOPE"); },
        "LOOPNE": function (prog: Program, tokens: Token[]): Statement { return new LOOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "LOOPNE"); },
        "LOOPNZ": function (prog: Program, tokens: Token[]): Statement { return new LOOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "LOOPNZ"); },
        "LOOPZ": function (prog: Program, tokens: Token[]): Statement { return new LOOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "LOOPZ"); },
        "LSL": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LSL) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "LSS": function (prog: Program, tokens: Token[]): Statement { return new IgnoredInstruction(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "LTR": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (LTR) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "MOV": function (prog: Program, tokens: Token[]): Statement { return new MOV(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, null); },
        "MOVS": function (prog: Program, tokens: Token[]): Statement { return new MOVS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "MOVSB": function (prog: Program, tokens: Token[]): Statement { return new MOVS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "MOVSW": function (prog: Program, tokens: Token[]): Statement { return new MOVS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "MOVSD": function (prog: Program, tokens: Token[]): Statement { return new MOVS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "MOVSQ": function (prog: Program, tokens: Token[]): Statement { return new MOVS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "MUL": function (prog: Program, tokens: Token[]): Statement { return new MUL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "NEG": function (prog: Program, tokens: Token[]): Statement { return new NEG(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "NOP": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "NOT": function (prog: Program, tokens: Token[]): Statement { return new NOT(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "OR": function (prog: Program, tokens: Token[]): Statement { return new OR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "OUTS": function (prog: Program, tokens: Token[]): Statement { return new OUTS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "OUTSB": function (prog: Program, tokens: Token[]): Statement { return new OUTS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "OUTSD": function (prog: Program, tokens: Token[]): Statement { return new OUTS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "OUTSW": function (prog: Program, tokens: Token[]): Statement { return new OUTS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "POP": function (prog: Program, tokens: Token[]): Statement { return new POP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "POPA": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (PUSHA/POPA, PUSHAD/POPAD) not valid in 64-bit mode :`("); },
        "POPAD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (PUSHA/POPA, PUSHAD/POPAD) not valid in 64-bit mode :`("); },
        "POPF": function (prog: Program, tokens: Token[]): Statement { return new POPF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "POPFD": function (prog: Program, tokens: Token[]): Statement { return new POPF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "POPFQ": function (prog: Program, tokens: Token[]): Statement { return new POPF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "PUSH": function (prog: Program, tokens: Token[]): Statement { return new PUSH(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "PUSHA": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (PUSHA/POPA, PUSHAD/POPAD) not valid in 64-bit mode :`("); },
        "PUSHAD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (PUSHA/POPA, PUSHAD/POPAD) not valid in 64-bit mode :`("); },
        "PUSHF": function (prog: Program, tokens: Token[]): Statement { return new PUSHF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "PUSHFD": function (prog: Program, tokens: Token[]): Statement { return new PUSHF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "PUSHFQ": function (prog: Program, tokens: Token[]): Statement { return new PUSHF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "RCL": function (prog: Program, tokens: Token[]): Statement { return new RCL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "RCR": function (prog: Program, tokens: Token[]): Statement { return new RCR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "REP": function (prog: Program, tokens: Token[]): Statement { return new REP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "REP"); },
        "REPE": function (prog: Program, tokens: Token[]): Statement { return new REP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "REPE");},
        "REPNE": function (prog: Program, tokens: Token[]): Statement { return new REP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "REPNE"); },
        "REPNZ": function (prog: Program, tokens: Token[]): Statement { return new REP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "REPNZ"); },
        "REPZ": function (prog: Program, tokens: Token[]): Statement { return new REP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "REPZ"); },
        "RET": function (prog: Program, tokens: Token[]): Statement { return new RET(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "RETF": function (prog: Program, tokens: Token[]): Statement { return new RET(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "RETN": function (prog: Program, tokens: Token[]): Statement { return new RET(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "ROL": function (prog: Program, tokens: Token[]): Statement { return new ROL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "ROR": function (prog: Program, tokens: Token[]): Statement { return new ROR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "SAHF": function (prog: Program, tokens: Token[]): Statement { return new SAHF(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "SAL": function (prog: Program, tokens: Token[]): Statement { return new SHL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); }, //The shift arithmetic left (SAL) and shift logical left (SHL) instructions perform the same operation
        "SAR": function (prog: Program, tokens: Token[]): Statement { return new SAR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "SBB": function (prog: Program, tokens: Token[]): Statement { return new SBB(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "SCAS": function (prog: Program, tokens: Token[]): Statement { return new SCAS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "SCASB": function (prog: Program, tokens: Token[]): Statement { return new SCAS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "SCASD": function (prog: Program, tokens: Token[]): Statement { return new SCAS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "SCASQ": function (prog: Program, tokens: Token[]): Statement { return new SCAS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "SCASW": function (prog: Program, tokens: Token[]): Statement { return new SCAS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "SETA": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETA"); },
        "SETAE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETAE"); },
        "SETB": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETB"); },
        "SETBE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETBE"); },
        "SETC": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETC"); },
        "SETE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETE"); },
        "SETG": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETG"); },
        "SETGE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETGE"); },
        "SETL": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETL"); },
        "SETLE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETLE"); },
        "SETNA": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNA"); },
        "SETNAE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNAE"); },
        "SETNB": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNB"); },
        "SETNBE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNBE"); },
        "SETNC": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNC"); },
        "SETNE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNE"); },
        "SETNG": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNG"); },
        "SETNGE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNGE"); },
        "SETNL": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNL"); },
        "SETNLE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNLE"); },
        "SETNO": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNO"); },
        "SETNP": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNP"); },
        "SETNS": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNS"); },
        "SETNZ": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETNZ"); },
        "SETO": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETO"); },
        "SETP": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETP"); },
        "SETPE": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETPE"); },
        "SETPO": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETPO"); },
        "SETS": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETS"); },
        "SETZ": function (prog: Program, tokens: Token[]): Statement { return new SETcc(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, "SETZ"); },
        "SGDT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (SGDT) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "SHL": function (prog: Program, tokens: Token[]): Statement { return new SHL(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "SHR": function (prog: Program, tokens: Token[]): Statement { return new SHR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "SIDT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (SIDT) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "SLDT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (SLDT) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "SMSW": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (SMSW) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "STAC": function (prog: Program, tokens: Token[]): Statement { return new STAC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "STC": function (prog: Program, tokens: Token[]): Statement { return new STC(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "STD": function (prog: Program, tokens: Token[]): Statement { return new STD(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "STI": function (prog: Program, tokens: Token[]): Statement { return new STI(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "STOS": function (prog: Program, tokens: Token[]): Statement { return new STOS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "STOSB": function (prog: Program, tokens: Token[]): Statement { return new STOS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 1); },
        "STOSW": function (prog: Program, tokens: Token[]): Statement { return new STOS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 2); },
        "STOSD": function (prog: Program, tokens: Token[]): Statement { return new STOS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 4); },
        "STOSQ": function (prog: Program, tokens: Token[]): Statement { return new STOS(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog, 8); },
        "STR": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (STR) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "SUB": function (prog: Program, tokens: Token[]): Statement { return new SUB(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "TEST": function (prog: Program, tokens: Token[]): Statement { return new TEST(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "VERR": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (VERR) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "VERW": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (VERW) is a protected mode operation and not valid in this emulator! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "WAIT": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "WBINVD": function (prog: Program, tokens: Token[]): Statement { return new NOP(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        "XCHG": function (prog: Program, tokens: Token[]): Statement { return new XCHG(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog);  },
        "XOR": function (prog: Program, tokens: Token[]): Statement { return new XOR(prog.preInstructionCallback, prog.postInstructionCallback, tokens, prog); },
        

        "IN": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (IN) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "OUT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (OUT) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "IRET": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (IRET) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "IRETD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (IRETD) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "IRETQ": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (IRETQ) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "MOVSX": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (MOVSX) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "MOVSXD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (MOVSXD) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "MOVZX": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (MOVZX) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "SHLD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (SHLD) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "SHRD": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (SHRD) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "XLAT": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (XLAT) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
        "XLATB": function (prog: Program, tokens: Token[]): Statement { prog.failedToken = tokens[prog.index]; throw new Error("Operand (XLATB) not Implemented yet! near: " + prog.failedToken.Value + "\nLine: " + prog.GetErrorLine()); },
    };
    
    /**
         * Handles System Calls from program. 
         * parameters in stdcall	(Microsoft)
    * parameter order on stack is: Right To Left (C style)
    * Stack managed by Callee
    * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
    * 
    * 
         */
    externalFunctions: { [functionname: string]: Function; } = {
        /**
         * Calls windows API: int MessageBoxA(HWND   hWnd, LPCSTR lpText, LPCSTR lpCaption, UINT   uType);
         * 
         * The browser will simulate the api by displaying an 'alert' popup.
         * Currently hWnd and uType are ignored.
         * 
         * @param prog
         */
        "MessageBoxA": function (prog: Program) {
            var msg = "";

            var uTypeAddr = prog.Regs.R9.R; //POP.Pop(prog, 4);
            var lpCaptionaddr = prog.Regs.R8.R; //POP.Pop(prog, 4);
            var lpTextaddr = prog.Regs.D.R; //POP.Pop(prog, 4);
            var hWndAddr = prog.Regs.C.R; // POP.Pop(prog, 4);

            var lpText;
            var lpCaption;

            if (lpCaptionaddr.greaterThan(Long.ZERO)) {
                lpCaption = prog.Mem.ReadZeroTerminatedString(lpCaptionaddr); //Caption
                if (lpCaption != null && lpCaption.length > 0)
                    msg += "Title: " + lpCaption + "\n\n";
            }

            if (lpTextaddr.greaterThan(Long.ZERO)) {
                lpText = prog.Mem.ReadZeroTerminatedString(lpTextaddr); //Message
                if (lpText != null && lpText.length > 0)
                    msg += lpText;
            }

            alert(msg);
            prog.Regs.A.E = Long.ONE; //Return: OK
        },

        "ExitProcess": function (prog: Program) {
            prog.End = true;
        }
    };

    private InitinterruptTable() {
        this.interruptTable = [];

        for (var i = 0; i < 256; i++)
            this.interruptTable.push(function (prog: Program) { });
    }

    public SetInterrupt(n: number, func: Function) {
        if (n > 255 || n < 0)
            throw new Error("Invalid Interrupt! Must be 0 to 255.");

        if (func == null)
            this.interruptTable[n] = function (prog: Program) { };
        this.interruptTable[n] = func;

    }

    interruptTable: Function[] = [    ];
}

class EvaluatedResult {
    Name: string;
    DataSize: number;
    Value: Long;

    constructor(name: string = null, val: any = null, size: number = 0) {
        this.DataSize = size;
        this.Value = val;
        this.Name = name;
    }
}

class StatementParameter {
    /* An address (Might not implment this one?), variable label, or Register */
    Target: string;
    /* Size in bytes of target (Really applies to memory only) */
    TargetSize: number = 0;
    /* Target is a Register when true; otherwise target points to a memory address. */
    //TargetIsRegister: boolean;
    TargetIsPointer: boolean = false;

    Program: Program;

    public Parameter: Statement;

    constructor(env: Program) {
        this.Program = env;
    }

    public Evaluate(): EvaluatedResult {
        var target: EvaluatedResult = this.Parameter.Evaluate();

        //if (this.TargetSize != 0)
        //    target.DataSize = this.TargetSize;

        //Adjust Size for variables. 
        if (this.Program.Mem.GetVariable(target.Name) != null) {
            if (this.TargetSize != 0) {
                target.DataSize = this.TargetSize;
            }

        }

        //if (!this.TargetIsPointer && target.DataSize > 0 && !(this.Parameter instanceof NumberValue)) {
        //        target.Value = this.Program.Mem.ReadMemoryNumber(target.Value, target.DataSize);
        //}
        return target;
    }
}

abstract class Statement {
    //public StatementPreEvaluate: Function = function () { };
    //public StatementPostEvaluated: Function = function (obj: Statement, result: EvaluatedResult) { };

    public Program: Program;

    public Token: Token;

    public FriendlyName: string;

    public Address: Long;

    public parameters: StatementParameter[] = [];
    
    public get Index(): number {

        return this.Token.TokenIndex;
    }

    public get Length(): number {
        return this.Token.TokenLength;
    }

    constructor(preEvalCallback: Function, postEvalCallback: Function, token: Token, env: Program) {
        this.Token = token;
        this.Program = env;
    }

    /// <summary>
    /// Steps over all the sub nodes in this statement and returns the result.
    /// </summary>
    /// <param name="type">The datatype returned by this Statement</param>
    /// <param name="thisInstance">Used to define the object this statement is referencing. (Like a function call on an object.)</param>
    /// <returns></returns>
    public abstract Evaluate(): EvaluatedResult

    /// <summary>
    /// teps into this statement and outputs a child node into nextNode to be evaluated before this node can be evaluated or 
    /// returns the evaluated result of this Statement.
    /// </summary>
    /// <param name="type"></param>
    /// <param name="thisInstance"></param>
    /// <param name="nextNode"></param>
    /// <param name="dir"></param>
    /// <returns></returns>
    //public abstract object StepIn(out DataType type, object thisInstance, int dir, out Statement nextNode);


    //public abstract Walk(): TreeNode

    //public GetPrefixes(useTarget: boolean, tokens: Token[], env: Program): void {
    //    var isreg = true;
    //    var size = 0;
    //    var breakbreakbreak = false;

    //    while (tokens[env.index].Value != "," && tokens[env.index].TokenType != TokenTypes.Mnemonic) {
    //        switch (tokens[env.index].Value.toUpperCase()) {
    //            case "PBYTE":
    //                isreg = false;
    //            case "BYTE":
    //                size = 1;
    //                break;
    //            case "PWORD":
    //                isreg = false;
    //            case "WORD":
    //                size = 2;
    //                break;
    //            case "PDWORD":
    //                isreg = false;
    //            case "DWORD":
    //                size = 4;
    //                break;
    //            case "PTR":
    //            //case "[":
    //            //case "]":
    //                isreg = false;
    //                break;
    //            default:
    //                breakbreakbreak = true;
    //                break;
    //        }
    //        if (breakbreakbreak)
    //            break;

    //        env.index++;
    //    }

    //    if (useTarget) {
    //        this.TargetIsRegister = isreg;
    //        this.TargetSize = size;
    //    }
    //    else {
    //        this.SourceIsRegister = isreg;
    //        this.SourceSize = size;
    //    }

    //}

    //public Get1ParameterStatements(tokens: Token[], env: Program) {

    //    this.GetPrefixes(true, tokens, env);
    //    this.Left = env.BuildAST(tokens);
    //    if (tokens[env.index].Value == ",") //Technically this should not happen
    //        throw new Error("Error paSIng 1 parameter instruction! Ran into an unexpected ','!");
    //}

    //public Get2ParameterStatements(tokens: Token[], env: Program) {
    //    this.GetPrefixes(true, tokens, env);
    //    if (tokens[env.index].Value == ",") //this should not happen
    //        throw new Error("Error paSIng 2 parameter instruction! Ran into a ',' before its time!");
    //    this.Left = env.BuildAST(tokens);
    //    if (tokens[env.index].Value == ",")
    //        env.index++;

    //    if (tokens[env.index].TokenType == TokenTypes.Mnemonic)
    //        return; //There's only one parameter.

    //    this.GetPrefixes(false, tokens, env);
    //    this.Right = env.BuildAST(tokens);
    //}

    public GetParameterStatements(tokens: Token[], env: Program) {

        if (tokens.length <= env.index)
            return;

        while (tokens[env.index].TokenType != TokenTypes.Mnemonic) {
            var param: StatementParameter = new StatementParameter(env);

            var isptr = false;
            var size = 0;
            var breakbreakbreak = false;

            while (tokens[env.index].Value != "," && tokens[env.index].TokenType != TokenTypes.Mnemonic) {
                switch (tokens[env.index].Value.toUpperCase()) {
                    case "PBYTE":
                        isptr = true;
                    case "BYTE":
                        size = 1;
                        break;
                    case "PWORD":
                        isptr = true;
                    case "WORD":
                        size = 2;
                        break;
                    case "PDWORD":
                        isptr = true;
                    case "DWORD":
                        size = 4;
                        break;
                    case "QWORD":
                        size = 8;
                        break;
                    case "PTR":
                        isptr = true;
                        break;
                    case "[":
                        isptr = true;
                        break;
                        ////case "]":
                        //isreg = false;
                        //break;
                    default:
                        breakbreakbreak = true;
                        break;
                }
                if (breakbreakbreak)
                    break;

                env.index++;


                if (tokens.length <= env.index)
                    return;
            }

            param.TargetIsPointer = isptr;
            param.Parameter = env.BuildAST(tokens);

            //if (env.Mem.GetVariable(param.Parameter.FriendlyName) != null)
            //    param.TargetIsRegister = false;

            if (size > 0)
                param.TargetSize = size;
            else if (!param.TargetIsPointer)
                param.TargetSize = Registers.RegisterSize(param.Parameter.FriendlyName);

            this.parameters.push(param);

            if (env.index >= tokens.length) //End of program.
                break;
            if (tokens[env.index].Value == ",")
                env.index++;
            else //Not another parameter!
                break;
        }
    }

    ///TODO: Target is an actual address...
    public AssignValueToTarget(value: Long, size: number, targetparam: StatementParameter = this.parameters[0]) {
        //var targetparam: StatementParameter = this.parameters[0];
        //var targetStmt = useRight ? this.Right : this.Left;
            var actualSize = size; // targetparam.TargetSize < size ? targetparam.TargetSize : size;

        if (targetparam.Parameter instanceof IdentifierStatement) {
            var isPtr = targetparam.TargetIsPointer;
            var target: IdentifierStatement = targetparam.Parameter;

            if (!isPtr && this.Program.Regs.SetRegister(target.Name, value)) {
                return true;
            }
            
            if (Registers.IsRegister(target.Name)) {
                this.Program.Mem.WriteMemory(this.Program.Regs.GetRegisterValue(target.Name), value, actualSize);
                return true;
            }

            var variable: Variable = this.Program.Mem.GetVariable(target.Name);

            if (variable != null) {
                //actualSize = actualSize < variable.Size ? actualSize : variable.Size;
                this.Program.Mem.WriteMemory(variable.Address, value, actualSize);
                return true;
            }
        }
        if (targetparam.Parameter instanceof NumberValue) {
            //var actualSize = targetparam.TargetSize < size ? targetparam.TargetSize : size;
            this.Program.Mem.WriteMemory(targetparam.Evaluate().Value, value, actualSize);
        }
        if (targetparam.Parameter instanceof OperationExpression) {
            //var actualSize = targetparam.TargetSize < size ? targetparam.TargetSize : size;
            this.Program.Mem.WriteMemory(targetparam.Evaluate().Value, value, actualSize);
        }
        return false;
    }

    public ARegisterHelper(size: number, env: Program): StatementParameter {
        var a = new StatementParameter(env);
        a.TargetIsPointer = false;
        a.TargetSize = size;

        if (a.TargetSize == 8)
            a.TargetSize = 4;

        var astmt = new IdentifierStatement(null, null, null, env);

        var aname = "";
        switch (a.TargetSize) {
            case 1:
                aname = "AL";
                break;
            case 2:
                aname = "AX";
                break;
            case 4:
                aname = "EAX";
                break;
            //case 8:
            //    aname = "RAX";
            //    break;
        }

        astmt.Name = aname;
        astmt.FriendlyName = aname;

        a.Target = aname;
        a.Parameter = astmt;

        return a;
    }

    // ByteSize Helper Functions
    public static SignExtendByte(b: Long): Long {
        if (b.and(Long.UByteEighty).equals(Long.UByteEighty))
            return (b.or(new Long(0xFFFFFF00)));
        else
            return b.maskLowBitsAnd(0xFF);
    }
    public static SignExtendUShort(b: Long): Long {
        if (b.and(Long.UShortEighty).equals(Long.UShortEighty))
            return (b.or(new Long(0xFFFF0000)));
        else
            return b.maskLowBitsAnd(0x0000FFFF);
    }
    public static SignExtendUInt(b: Long): Long {
        if (b.and(Long.UIntEighty).equals(Long.UIntEighty))
            return (b.or(new Long(0xFFFF0000))); //(b | 0xFFFF0000);
        else
            return b.maskLowBitsAnd(0xFFFFFFFF); //0x0000FFFF & b;
    }

    

    public static Size(tsize: number, tparam: StatementParameter, ssize: number, sparam: StatementParameter): number {
        if (tsize == null || !isFinite(tsize))
            tsize = 0;
        
        var size = tparam.TargetSize;

        if (size == 0)
            size = tsize;

        if (size == 1 || size == 2 || size == 4 || size == 8) // Probably the size of a variable which can be any size so we'll clamp it
            return size;

        size = sparam.TargetSize;

        if (ssize == null || !isFinite(ssize))
            ssize = 0;

        if (size == 0)
            size = ssize;

        if (size == 1 || size == 2 || size == 4 || size == 8) // Probably the size of a variable which can be any size so we'll clamp it
            return size;
        
        return tsize;
    }
    
}

class BlockStatement extends Statement {
    public Statements: Statement[] = [];

    constructor(preEvalCallback: Function, postEvalCallback: Function, t: Token, env: Program) {
        super(preEvalCallback, postEvalCallback, t, env);

        if (t != null && t.Value != null) {
            this.FriendlyName = t.Value;
        }
        else
            this.FriendlyName = "Block Statement";
    }


    public Evaluate(): EvaluatedResult {
        //this.Program.preInstructionCallback(this);
        var result: EvaluatedResult = new EvaluatedResult();
        result.DataSize = 0;
        result.Value = null;

        for (var i = 0; i < this.parameters.length; i++) {
            this.parameters[i].Evaluate();
        }

        for (var i = 0; i < this.Statements.length; i++)
        {
            var s: Statement = this.Statements[i];
            
            result = s.Evaluate();

            if (this.Program.EndFunction) {
                break;
            }

            //if (Env.InterruptLoop)
            //    break;
        }


        //this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class OperationExpression extends Statement
{
        public Op: Operator ;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token, env: Program, left: Statement, right: Statement = null)
    {
        super(preInstructionCallback, postInstructionCallback, t, env);
        this.Op = Operator.Get(Operator.Operators, t.Value);
        this.FriendlyName = t.Value;

        var paraml: StatementParameter = new StatementParameter(env);
        paraml.Parameter = left;
        this.parameters.push(paraml);
        if (right != null) {
            var paramr: StatementParameter = new StatementParameter(env);
            paramr.Parameter = right;

            this.parameters.push(paramr);
        }
    }

    public Evaluate(): EvaluatedResult {

        //this.Program.preInstructionCallback(this);

        var result = new EvaluatedResult();
        //result.DataSize = 0;
        //result.Value = 0;

        var left: EvaluatedResult = this.parameters[0].Evaluate();
        var right: EvaluatedResult;

        if (this.parameters.length > 1)
            right = this.parameters[1].Evaluate();
        else
            right = new EvaluatedResult(null, 0, 0);

        result.DataSize = Math.max(right.DataSize, left.DataSize);

        switch (this.Op.Op) {
            case Operation.UnaryPlus: // +
                result.Value = right.Value.add(left.Value);
                break;
            case Operation.UnaryNegation: // -
                result.Value = right.Value .subtract(left.Value);
                break;
            case Operation.Multiplication: // *
                result.Value = right.Value.multiply(left.Value);
                break;
            case Operation.Division: // /
                result.Value = right.Value.divide(left.Value);
                break;
            case Operation.Remainder: // % MOD
                result.Value = right.Value.modulo(left.Value);
                break;
            case Operation.Equal: //== EQ
                result.Value = right.Value.equals(left.Value) ? Long.ONE : Long.UZERO;
                break;
            case Operation.NotEqual: // != NE
                result.Value = !right.Value.equals(left.Value) ? Long.ONE : Long.UZERO;
                break;
            case Operation.GreaterThan: // > GT
                result.Value = right.Value.greaterThan(left.Value) ? Long.ONE : Long.UZERO;
                break;
            case Operation.GreateerThanEqual: // >= GE
                result.Value = right.Value.greaterThanOrEqual(left.Value) ? Long.ONE : Long.UZERO;
                break;
            case Operation.LessThan: // < LT
                result.Value = right.Value.lessThan(left.Value) ? Long.ONE : Long.UZERO;
                break;
            case Operation.LessThanEqual: // LE
                result.Value = right.Value.lessThanOrEqual(left.Value) ? Long.ONE : Long.UZERO;
                break;
            case Operation.BitwiseAND: // & AND
                result.Value = right.Value.and(left.Value);
                break;
            case Operation.BitwiseOR: // | OR
                result.Value = right.Value .or(left.Value);
                break;
            case Operation.BitwiseNOT: // ^ NOT
                result.Value = right.Value.xor(left.Value);
                break;
            case Operation.LeftShift: // << SHL
                result.Value = right.Value.shiftLeft(left.Value.getLowBits());
                break;
            case Operation.UnsignedRightShiftAssignment: // >> SHR
                result.Value = right.Value.shiftRight(left.Value.getLowBits());
                break;
            case Operation.Length:
                //result.Value = left.DataSize;
                var v = this.Program.Mem.GetVariable(left.Name);
                if (v != null)
                    result.Value = new Long(v.Size);
                break;
        }

        //this.Program.postInstructionCallback(this, result);

        return result;
    }
}

class NumberValue extends Statement
{
        public Value: Long;
        //public DataType Type = DataType.Number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token, env: Program = null)
    {
        super(preInstructionCallback, postInstructionCallback, t, env);
        this.Value = Long.fromString(t.Value);
        this.FriendlyName = t.Value;
    }

    public Evaluate(): EvaluatedResult {
        //this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult(null, this.Value);
        //this.Program.postInstructionCallback(this, result);
        return result;
    }
    
}

class StringValue extends Statement
{
    public Value: string;
    //public DataType Type = DataType.Number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token, env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t, env);
        this.Value = t.Value;
        this.FriendlyName = t.Value;
    }

    public Evaluate(): EvaluatedResult {
        //this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult(this.Value);
        //this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class IdentifierStatement extends Statement
{
        public Name: string;
        
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token, env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t, env);

        if (t != null) {
            this.Name = t.Value;
            this.FriendlyName = t.Value;
        }
    }

    public Evaluate(): EvaluatedResult {
        //this.Program.preInstructionCallback(this);

        var result = new EvaluatedResult(this.Name);

        var variable = this.Program.Mem.GetVariable(this.Name);
        var label = this.Program.GetLabel(this.Name);

        if (variable) {
            result.DataSize = variable.Size;
            result.Value = variable.Address.copy();
            result.Name = this.Name;
        }
        else if (label) {
            result.DataSize = label.Size;
            result.Value = label.Address;
            result.Name = this.Name;
        }
        else {
            var name = this.Name.toUpperCase();
            switch (name) {
                case "RET":
                    this.Program.EndFunction = true;
                    result.Value = Long.UZERO;
                    break;
                case "RAX":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.A.R;
                    break;
                case "RBX":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.B.R;
                    break;
                case "RCX":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.C.R;
                    break;
                case "RDX":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.D.R;
                    break;
                case "RBP":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.BP.R;
                    break;
                case "RSI":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.SI.R;
                    break;
                case "RDI":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.DI.R;
                    break;
                case "RSP":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.SP.R;
                    break;
                case "RIP":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.IP.R;
                    break;

                case "EAX":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.A.E;
                    break;
                case "EBX":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.B.E;
                    break;
                case "ECX":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.C.E;
                    break;
                case "EDX":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.D.E;
                    break;
                case "EBP":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.BP.E;
                    break;
                case "ESI":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.SI.E;
                    break;
                case "EDI":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.DI.E;
                    break;
                case "ESP":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.SP.E;
                    break;
                case "EIP":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.IP.E;
                    break;


                case "AX":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.A.X;
                    break;
                case "BX":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.B.X;
                    break;
                case "CX":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.C.X;
                    break;
                case "DX":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.D.X;
                    break;
                case "BP":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.BP.X;
                    break;
                case "SI":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.SI.X;
                    break;
                case "DI":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.DI.X;
                    break;
                case "SP":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.SP.X;
                    break;
                case "IP":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.IP.X;
                    break;

                case "AL":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.A.L;
                    break;
                case "BL":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.B.L;
                    break;
                case "CL":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.C.L;
                    break;
                case "DL":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.D.L;
                    break;
                //case "BL":
                //    this.Program.Regs.BP.L;
                //    break;
                //case "SL":
                //    this.Program.Regs.SI.L;
                //    break;
                //case "DL":
                //    this.Program.Regs.DI.L;
                //    break;
                //case "SL":
                //    this.Program.Regs.SP.L;
                //    break;
                ////case "IL":
                //    this.Program.Regs.IP.L;
                //    break;
                case "AH":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.A.H;
                    break;
                case "BH":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.B.H;
                    break;
                case "CH":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.C.H;
                    break;
                case "DH":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.D.H;
                    break;

                case "R8":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R8.R;
                    break;
                case "R9":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R9.R;
                    break;
                case "R10":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R10.R;
                    break;
                case "R11":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R11.R;
                    break;
                case "R12":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R12.R;
                    break;
                case "R13":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R13.R;
                    break;
                case "R14":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R14.R;
                    break;
                case "R15":
                    result.DataSize = 8;
                    result.Value = this.Program.Regs.R15.R;
                    break;

                case "R8D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R8.D;
                    break;
                case "R9D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R9.D;
                    break;
                case "R10D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R10.D;
                    break;
                case "R11D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R11.D;
                    break;
                case "R12D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R12.D;
                    break;
                case "R13D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R13.D;
                    break;
                case "R14D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R14.D;
                    break;
                case "R15D":
                    result.DataSize = 4;
                    result.Value = this.Program.Regs.R15.D;
                    break;

                case "R8W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R8.W;
                    break;
                case "R9W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R9.W;
                    break;
                case "R10W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R10.W;
                    break;
                case "R11W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R11.W;
                    break;
                case "R12W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R12.W;
                    break;
                case "R13W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R13.W;
                    break;
                case "R14W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R14.W;
                    break;
                case "R15W":
                    result.DataSize = 2;
                    result.Value = this.Program.Regs.R15.W;
                    break;

                case "R8B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R8.B;
                    break;
                case "R9B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R9.B;
                    break;
                case "R10B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R10.B;
                    break;
                case "R11B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R11.B;
                    break;
                case "R12B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R12.B;
                    break;
                case "R13B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R13.B;
                    break;
                case "R14B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R14.B;
                    break;
                case "R15B":
                    result.DataSize = 1;
                    result.Value = this.Program.Regs.R15.B;
                    break;

            }
        }
        //object result = Name;

        //this.Program.postInstructionCallback(this, result);
        return result;
    }
        
}

class IgnoredInstruction extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;

        this.GetParameterStatements(t, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult(this.FriendlyName);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);

        console.log("Warning Unused Instruction Executed! " + this.Token.Value);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}


class NOP extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class HLT extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class END extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index-1], env);
        //env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);

        this.Program.End = true;

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class MOV extends Statement {

    /* For conditional moves. */
    Condition: string;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null, condition: string) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.Condition = condition;

        this.GetParameterStatements(tokens, env);

        //env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);

        if (this.parameters[1].TargetIsPointer && ssize > 0) { // && !(this.parameters[1].Parameter instanceof NumberValue)) {
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);
        }

        if (this.MeetsCondition()) {
            if (this.AssignValueToTarget(source.Value, tsize)) {
            }
            //this.Program.Regs.RFlags.SetFlags(target.DataSize, source.Value);
        }
        this.Program.postInstructionCallback(this, source);
        return source;
    }

    public MeetsCondition(): boolean {
        if (this.Condition == null)
            return true;

        switch (this.Condition.toUpperCase()) {
            default: //No conditions to meet!
                return true;
            case "CMOVA": //Move if above (CF=0 and ZF=0).
                return this.Program.Regs.RFlags.CF == false && this.Program.Regs.RFlags.ZF == false;
            case "CMOVAE": //Move if above or equal (CF=0).
                return this.Program.Regs.RFlags.CF == false;
            case "CMOVB": //Move if below (CF=1).
                return this.Program.Regs.RFlags.CF == true;
            case "CMOVBE": //Move if below or equal (CF=1 or ZF=1).
                return this.Program.Regs.RFlags.CF == true || this.Program.Regs.RFlags.ZF == true;
            case "CMOVC": //Move if carry (CF=1).
                return this.Program.Regs.RFlags.CF == true;
            case "CMOVE": //Move if equal (ZF=1).
                return this.Program.Regs.RFlags.ZF == true;
            case "CMOVG": //Move if greater (ZF=0 and SF=OF).
                return this.Program.Regs.RFlags.ZF == false && this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "CMOVGE": //Move if greater or equal (SF=OF).
                return this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "CMOVL": //Move if less (SF≠ OF).
                return this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "CMOVLE": //Move if less or equal (ZF=1 or SF≠ OF).
                return this.Program.Regs.RFlags.ZF == true || this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "CMOVNA": //Move if not above (CF=1 or ZF=1).
                return this.Program.Regs.RFlags.CF == true || this.Program.Regs.RFlags.ZF == true;
            case "CMOVNAE": //Move if not above or equal (CF=1).
                return this.Program.Regs.RFlags.CF == true;
            case "CMOVNB": //Move if not below (CF=0).
                return this.Program.Regs.RFlags.CF == false;
            case "CMOVNBE": //Move if not below or equal (CF=0 and ZF=0).
                return this.Program.Regs.RFlags.CF == false && this.Program.Regs.RFlags.ZF == false;
            case "CMOVNC": //Move if not carry (CF=0).
                return this.Program.Regs.RFlags.CF == false;
            case "CMOVNE": //Move if not equal (ZF=0).
                return this.Program.Regs.RFlags.ZF == false;
            case "CMOVNG": //Move if not greater (ZF=1 or SF≠ OF).
                return this.Program.Regs.RFlags.ZF == true || this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "CMOVNGE": //Move if not greater or equal (SF≠ OF).
                return this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "CMOVNL": //Move if not less (SF=OF).
                return this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "CMOVNLE": //Move if not less or equal (ZF=0 and SF=OF).
                return this.Program.Regs.RFlags.ZF == false && this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "CMOVNO": //Move if not overflow (OF=0).
                return this.Program.Regs.RFlags.OF == false;
            case "CMOVNP": //Move if not parity (PF=0).
                return this.Program.Regs.RFlags.PF == false;
            case "CMOVNS": //Move if not sign (SF=0).
                return this.Program.Regs.RFlags.SF == false;
            case "CMOVNZ": //Move if not zero (ZF=0).
                return this.Program.Regs.RFlags.ZF == false;
            case "CMOVO": //Move if overflow (OF=1).
                return this.Program.Regs.RFlags.OF == true;
            case "CMOVP": //Move if parity (PF=1).
                return this.Program.Regs.RFlags.PF == true;
            case "CMOVPE": //Move if parity even (PF=1).
                return this.Program.Regs.RFlags.PF == true;
            case "CMOVPO": //Move if parity odd (PF=0).
                return this.Program.Regs.RFlags.PF == false;
            case "CMOVS": //Move if sign (SF=1).
                return this.Program.Regs.RFlags.SF == true;
            case "CMOVZ": //Move if zero (ZF=1).
                return this.Program.Regs.RFlags.ZF == true;
        }
    }
}

class SUB extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);
        
        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.subtract(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, target.DataSize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class ADD extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.add(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class CALL extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        //Check if target is an external ref or a label... then either call and return or jump to.

        var left = this.parameters[0].Evaluate();
        
        if (this.parameters[0].TargetIsPointer)
            left.Value = this.Program.Mem.ReadMemoryNumber(left.Value, left.DataSize);


        var isLocal: boolean = false;

        for (var i = 0; i < this.Program.Labels.length; i++) {
            if (this.Program.Labels[i].Name == left.Name) {
                //TODO: Local Call Update stack and IP.
                PUSH.Push(this.Program, 4, this.Program.Regs.IP.E);
                this.Program.Regs.IP.E = left.Value;
                isLocal = true;
                break;
            }
        }

        if (!isLocal) {

            var func = this.Program.externalFunctions[left.Name];

            if (func) {
                func(this.Program);
            }
            else {
                this.Program.failedToken = this.Token;
                throw new Error("Undefined Reference call! " + left.Name + " near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
            }
        }
        var result =  new EvaluatedResult(left.Name, this.Program.Regs.A.E);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class RET extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        if (tokens.length > env.index && tokens[env.index].TokenType == TokenTypes.Number)
            this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        //Check if target is an external ref or a label... then either call and return or jump to.
        //if (!this.parameters[0].TargetIsRegister)
        //    left.Value = this.Program.Mem.ReadMemoryNumber(left.Value, left.DataSize);
        
        //TODO: Local Call Update stack and IP.
        var value = POP.Pop(this.Program, 4);
        this.Program.Regs.IP.E = value.add(new Long(4));

        var left;

        if (this.parameters.length > 0) {
            left = this.parameters[0].Evaluate();

            this.Program.Regs.SP.E = this.Program.Regs.SP.E.add(left.Value);

        }

        var result = new EvaluatedResult("RET", this.Program.Regs.IP.E);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class LEA extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        //var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        //var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        //if (!this.parameters[1].TargetIsRegister)
        //    source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        if (this.AssignValueToTarget(source.Value, target.DataSize)) {
        }
        //this.Program.Regs.RFlags.SetFlags(source.DataSize, source.Value);
        this.Program.postInstructionCallback(this, source);
        return source;
    }
}

class PUSH extends Statement {
    
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);
        
        this.GetParameterStatements(tokens, env);
        //env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        
        var source: EvaluatedResult = this.parameters[0].Evaluate();
        source.DataSize = this.parameters[0].TargetSize;
        
        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);


        PUSH.Push(this.Program, source.DataSize, source.Value);
        
        this.Program.postInstructionCallback(this, source);
        return source;
    }

    public static Push(program: Program, size: number, val: Long) {
        program.Regs.SP.E = program.Regs.SP.E.subtract(new Long(size));
        program.Mem.WriteMemoryNumber(program.Regs.SP.E, val, size);
        //program.Regs.RFlags.SetFlags(size, val);
    }
}

class POP extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
        //env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        target.DataSize = this.parameters[0].TargetSize;
        
        //if (!this.parameters[1].TargetIsRegister)
        //    target.Value = this.Program.Mem.ReadMemoryNumber(target.Value, target.DataSize);


        var val = POP.Pop(this.Program, target.DataSize);
        target.Value = val;

        if (this.AssignValueToTarget(val, target.DataSize)) {
        }

        this.Program.postInstructionCallback(this, target);
        return target;
    }

    public static Pop(program: Program, size: number): Long {
        var val = program.Mem.ReadMemoryNumber(program.Regs.SP.E, size);
        program.Regs.SP.E = program.Regs.SP.E.add(new Long(size));

        //program.Regs.RFlags.SetFlags(size, val);
        return val;
    }
}

class PUSHF extends Statement {
    public FlagSize: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null, size: number) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);
        this.FlagSize = size;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var flags = this.Program.Regs.RFlags.SaveFlags();
        var result: EvaluatedResult;

        switch (this.FlagSize) {
            case 2:
                PUSH.Push(this.Program, 2, flags);
                result = new EvaluatedResult("Flags", flags, 2);
                break;
            case 4:
                result = new EvaluatedResult("EFlags", flags.and(new Long(0x00FCFFFF)), 4);
                PUSH.Push(this.Program, 4, result.Value);
                break;
            case 8:
                PUSH.Push(this.Program, 8, flags);
                result = new EvaluatedResult("RFlags", flags, 8);
                break;
        }

        this.Program.postInstructionCallback(this, result);
        return result;
    }
    
}

class POPF extends Statement {
    public FlagSize: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null, size: number) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.FlagSize = size;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var result: EvaluatedResult = new EvaluatedResult();

        switch (this.FlagSize) {
            case 2:
                result.Name = "FLAGS";
            case 4:
                result.Name = "EFLAGS";
            case 8:
                result.Name = "RFLAGS";
        }

        var val = POP.Pop(this.Program, this.FlagSize);
        result.Value = val;
        result.DataSize = this.FlagSize;
        this.Program.Regs.RFlags.LoadFlags(val, this.FlagSize);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

    public static Pop(program: Program, size: number): Long {
        var val = program.Mem.ReadMemoryNumber(program.Regs.SP.E, size);
        program.Regs.SP.E = program.Regs.SP.E.add(new Long(size));

        //program.Regs.RFlags.SetFlags(size, val);
        return val;
    }
}

class ADC extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.add(source.Value).add((this.Program.Regs.RFlags.CF ? Long.ONE : Long.ZERO));
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class SBB extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.subtract(source.Value.add(this.Program.Regs.RFlags.CF ? Long.ONE : Long.ZERO));
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class MUL extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
        //this.Right = new IdentifierStatement(preInstructionCallback, postInstructionCallback, null, env, null, null);

        if (this.parameters.length == 1)
            this.parameters.splice(0, 0, this.ARegisterHelper(this.parameters[0].TargetSize << 1, env));

    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.multiply(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class IMUL extends Statement {
    //Signed Multiply
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);

        if (this.parameters.length == 0) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: IMUL missing parameters (Needs 1 to 3)! near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
        if (this.parameters.length == 1) //If only one param then dest is A register.
            this.parameters.splice(0, 0, this.ARegisterHelper(this.parameters[0].TargetSize << 1, env));
        //if (this.parameters.length == 2) //If only one param then dest is A register.
        //    this.parameters.splice(0, 0, this.ARegisterHelper(this.parameters[0].TargetSize << 1, env));

        if (this.parameters[0].TargetIsPointer) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: IMUL destination must be a register.  near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
        if (this.parameters[1].Parameter instanceof NumberValue) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: IMUL second parameter cannot be a number.  near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
        if (this.parameters.length == 3 && !(this.parameters[2].Parameter instanceof NumberValue)) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: IMUL third parameter must be a number.  near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source1: EvaluatedResult = new EvaluatedResult();
        var source2: EvaluatedResult = new EvaluatedResult();
        var result: EvaluatedResult;
        var value: Long;
        var tsize;
        var ssize;

        if (this.parameters.length == 3) {
            source2 = this.parameters[1].Evaluate();
            source1 = this.parameters[2].Evaluate();
            tsize = Statement.Size(target.DataSize, this.parameters[1], source2.DataSize, this.parameters[1]);
            ssize = Statement.Size(source2.DataSize, this.parameters[2], target.DataSize, this.parameters[0]);
            if (this.parameters[2].TargetIsPointer)
                source1.Value = this.Program.Mem.ReadMemoryNumber(source1.Value, ssize);
        } else {
            source1 = this.parameters[0].Evaluate();
            source2 = this.parameters[1].Evaluate();
            tsize = Statement.Size(target.DataSize, this.parameters[0], source2.DataSize, this.parameters[1]);
            ssize = Statement.Size(source2.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
            if (this.parameters[0].TargetIsPointer)
                source1.Value = this.Program.Mem.ReadMemoryNumber(source1.Value, ssize);
        }
        
        if (this.parameters[1].TargetIsPointer)
            source2.Value = this.Program.Mem.ReadMemoryNumber(source2.Value, ssize);

        //target.Value.multiply(source.Value);
        value = source1.Value.multiply(source2.Value);

        switch (tsize) {
            case 1:
                if (this.parameters.length == 2) {
                    this.Program.Regs.A.X = value;
                }
                if ((value.getLowBits() & 0x80) == (value.getLowBits() & 0x80)) { this.Program.Regs.RFlags.CF = false; this.Program.Regs.RFlags.OF = false; }
                else { this.Program.Regs.RFlags.CF = true; this.Program.Regs.RFlags.OF = true; }
                break;
            case 2:
                if (this.parameters.length == 2) {
                    var v = value.getLowBits();
                    this.Program.Regs.D.X = new Long((v >> 16) & 0xFFFF);
                    this.Program.Regs.A.X = new Long(v & 0xFFFF);
                }
                if ((value.getLowBits() & 0x8000) == (value.getLowBits() & 0x8000)) { this.Program.Regs.RFlags.CF = false; this.Program.Regs.RFlags.OF = false; }
                else { this.Program.Regs.RFlags.CF = true; this.Program.Regs.RFlags.OF = true; }
                break;
            case 4:
                if (this.parameters.length == 2) {
                    this.Program.Regs.D.E = new Long(value.getHighBits());
                    this.Program.Regs.A.E = new Long(value.getLowBits());
                }
                if ((value.getLowBits() & 0x80000000) == (value.getLowBits() & 0x80000000)) { this.Program.Regs.RFlags.CF = false; this.Program.Regs.RFlags.OF = false; }
                else { this.Program.Regs.RFlags.CF = true; this.Program.Regs.RFlags.OF = true; }
                break;
            case 8:
                var bigvalue: Long[] = Long.LongBinaryMultiply(source1.Value, source2.Value);
                if (this.parameters.length == 2) {
                    this.Program.Regs.D.R = bigvalue[0];
                    this.Program.Regs.A.R = bigvalue[1];
                }
                if ((value.isUnsignedNegative()) == (value.isUnsignedNegative())) { this.Program.Regs.RFlags.CF = false; this.Program.Regs.RFlags.OF = false; }
                else { this.Program.Regs.RFlags.CF = true; this.Program.Regs.RFlags.OF = true; }
                break;
        }
        
        result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.parameters.length == 3)
            this.AssignValueToTarget(value, target.DataSize);

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class DIV extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);

        if (this.parameters.length == 1)
            this.parameters.splice(0, 0, this.ARegisterHelper(this.parameters[0].TargetSize << 1, env));

    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        
        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        //var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value: Long = target.Value.divide(source.Value);
        var mod: Long = target.Value.modulo(source.Value);

        switch (source.DataSize) {
            case 1:
                this.Program.Regs.A.L = value;
                this.Program.Regs.A.H = mod;
                break;
            case 2:
                this.Program.Regs.A.X = value;
                this.Program.Regs.D.X = mod;
                break;
            case 4:
                this.Program.Regs.A.E = value;
                this.Program.Regs.D.E = mod;
                break;
            case 8:
                this.Program.Regs.A.R = value;
                this.Program.Regs.D.R = mod;
                break;
        }


        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        //if (this.AssignValueToTarget(value, tsize)) {
        //}
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

///TODO: Sign Extend
class IDIV extends Statement {
    //Signed Multiply
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);

        if (this.parameters.length == 1)
            this.parameters.splice(0, 0, this.ARegisterHelper(this.parameters[0].TargetSize << 1, env));

    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        //var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value: Long = target.Value.divide(source.Value);
        var mod: Long = target.Value.modulo(source.Value);


        switch (target.DataSize) {
            case 1:
                this.Program.Regs.A.L = value;
                this.Program.Regs.A.H = mod;
                break;
            case 2:
                this.Program.Regs.A.X = value;
                this.Program.Regs.D.X = mod;
                break;
            case 4:
                this.Program.Regs.A.E = value;
                this.Program.Regs.D.E = mod;
                break;
            case 8:
                this.Program.Regs.A.R = value;
                this.Program.Regs.D.R = mod;
                break;
        }


        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        //if (this.AssignValueToTarget(value, tsize)) {
        //}
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}


class INC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var source: EvaluatedResult = this.parameters[0].Evaluate();
        source.DataSize = this.parameters[0].TargetSize;
        
        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);


        source.Value = source.Value.increment();
        this.AssignValueToTarget(source.Value, source.DataSize)
        this.Program.Regs.RFlags.SetFlags(source.DataSize, source.Value, source.Value);
        this.Program.postInstructionCallback(this, source);
        return source;
    }
}

class DEC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var source: EvaluatedResult = this.parameters[0].Evaluate();
        source.DataSize = this.parameters[0].TargetSize;
        
        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);


        source.Value = source.Value.decrement();
        this.AssignValueToTarget(source.Value, source.DataSize)
        this.Program.Regs.RFlags.SetFlags(source.DataSize, source.Value, source.Value);
        this.Program.postInstructionCallback(this, source);
        return source;
    }
}

class NEG extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var source: EvaluatedResult = this.parameters[0].Evaluate();
        source.DataSize = this.parameters[0].TargetSize;
        
        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);


        source.Value = source.Value.negate();
        this.AssignValueToTarget(source.Value, source.DataSize)

        this.Program.Regs.RFlags.SetFlags(source.DataSize, source.Value, source.Value);
        if (source.Value.equals(Long.ONE))
            this.Program.Regs.RFlags.CF = false;
        else
            this.Program.Regs.RFlags.CF = true;

        this.Program.postInstructionCallback(this, source);
        return source;
    }
}

class XCHG extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);

        //env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[0].TargetIsPointer)
            target.Value = this.Program.Mem.ReadMemoryNumber(target.Value, tsize);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        if (this.AssignValueToTarget(source.Value, ssize)) { }
        if (this.AssignValueToTarget(target.Value, tsize, this.parameters[1])) { }
        //this.Program.Regs.RFlags.SetFlags(target.DataSize, source.Value);

        this.Program.postInstructionCallback(this, source);
        return source;
    }
}

class BSWAP extends Statement {
    
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);
        
        this.GetParameterStatements(tokens, env);

        //env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var source: EvaluatedResult = this.parameters[0].Evaluate();
        
        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);

        switch (source.DataSize) {
            case 2:
                var tmp = ((source.Value.getLowBits() >> 8) & 0xFF) | ((source.Value.getLowBits() << 8) & 0xFF00)
                source.Value = new Long(tmp);
                break;
            case 4:
                var b1 = ((source.Value.getLowBits() >> 24) & 0xFF);
                var b2 = ((source.Value.getLowBits() >> 16) & 0xFF);
                var b3 = ((source.Value.getLowBits() >> 8) & 0xFF);
                var b4 = (source.Value.getLowBits() & 0xFF);

                var tmp = (b1) | (b2 << 8) | (b3 << 16) | (b4 << 24);
                source.Value = new Long(tmp);
                break;
            case 8:
                var bytes = source.Value.toBytes(true);


                source.Value = Long.fromBytes(bytes.reverse(), true, true);
                break;
        }



        if (this.AssignValueToTarget(source.Value, source.DataSize)) { }
        //this.Program.Regs.RFlags.SetFlags(target.DataSize, source.Value);

        this.Program.postInstructionCallback(this, source);
        return source;
    }
    
}

class CMP extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[0].TargetIsPointer)
            target.Value = this.Program.Mem.ReadMemoryNumber(target.Value, ssize);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.subtract(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);
        
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, target.Value, source.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class TEST extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.and(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        //if (this.AssignValueToTarget(value, tsize)) { }

        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class AND extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.and(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class NOT extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        
        var target: EvaluatedResult = this.parameters[0].Evaluate();
        
        if (this.parameters[0].TargetIsPointer)
            target.Value = this.Program.Mem.ReadMemoryNumber(target.Value, target.DataSize);


        var value = target.Value.not();
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, target.DataSize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class OR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.or(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class XOR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var value = target.Value.xor(source.Value);
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class JMP extends Statement {

    /* For conditional moves. */
    Condition: string;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null, condition: string) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.Condition = condition;

        this.GetParameterStatements(tokens, env);
        
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var source: EvaluatedResult = this.parameters[0].Evaluate();
        
        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);


        if (this.MeetsCondition()) {
            //if (this.AssignValueToTarget(source.Value, source.DataSize)) { }

            //this.Program.Labels

            this.Program.Regs.IP.E = source.Value;

            //this.Program.Regs.RFlags.SetFlags(target.DataSize, source.Value);
        }
        this.Program.postInstructionCallback(this, source);
        return source;
    }

    public MeetsCondition(): boolean {
        if (this.Condition == null)
            return true;

        switch (this.Condition.toUpperCase()) {
            default: //No conditions to meet!
            case "JMPF": //
                return true;
            case "JA": //Jump short if above (CF=0 and ZF=0).
                return this.Program.Regs.RFlags.CF == false && this.Program.Regs.RFlags.ZF == false;
            case "JAE": //Jump short if above or equal (CF=0).
                return this.Program.Regs.RFlags.CF == false;
            case "JB": //Jump short if below (CF=1).
                return this.Program.Regs.RFlags.CF == true;
            case "JBE": //Jump short if below or equal (CF=1 or ZF=1).
                return this.Program.Regs.RFlags.CF == true || this.Program.Regs.RFlags.ZF == true;
            case "JC": //Jump short if carry (CF=1).
                return this.Program.Regs.RFlags.CF == true;
            case "JE": //Jump short if equal (ZF=1).
                return this.Program.Regs.RFlags.ZF == true;
            case "JECXZ": //Jump short if ECX register is 0.
                return this.Program.Regs.C.E.equals(Long.UZERO);
            case "JG": //Jump short if greater (ZF=0 and SF=OF).
                return this.Program.Regs.RFlags.ZF == false && this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "JGE": //Jump short if greater or equal (SF=OF).
                return this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "JL": //Jump short if less (SF≠ OF).
                return this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "JLE": //Jump short if less or equal (ZF=1 or SF≠ OF).
                return this.Program.Regs.RFlags.ZF == true || this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "JNA": //Jump short if not above (CF=1 or ZF=1).
                return this.Program.Regs.RFlags.CF == true || this.Program.Regs.RFlags.ZF == true;
            case "JNAE": //Jump short if not above or equal (CF=1).
                return this.Program.Regs.RFlags.CF == true;
            case "JNB": //Jump short if not below (CF=0).
                return this.Program.Regs.RFlags.CF == false;
            case "JNBE": //Jump short if not below or equal (CF=0 and ZF=0).
                return this.Program.Regs.RFlags.CF == false && this.Program.Regs.RFlags.ZF == false;
            case "JNC": //Jump short if not carry (CF=0).
                return this.Program.Regs.RFlags.CF == false;
            case "JNE": //Jump short if not equal (ZF=0).
                return this.Program.Regs.RFlags.ZF == false;
            case "JNG": //Jump short if not greater (ZF=1 or SF≠ OF).
                return this.Program.Regs.RFlags.ZF == true || this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "JNGE": //Jump short if not greater or equal (SF≠ OF).
                return this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF;
            case "JNL": //Jump short if not less (SF=OF).
                return this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "JNLE": //Jump short if not less or equal (ZF=0 and SF=OF).
                return this.Program.Regs.RFlags.ZF == false && this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF;
            case "JNO": //Jump short if not overflow (OF=0).
                return this.Program.Regs.RFlags.OF == false;
            case "JNP": //Jump short if not parity (PF=0).
                return this.Program.Regs.RFlags.PF == false;
            case "JNS": //Jump short if not sign (SF=0).
                return this.Program.Regs.RFlags.SF == false;
            case "JNZ": //Jump short if not zero (ZF=0).
                return this.Program.Regs.RFlags.ZF == false;
            case "JO": //Jump short if overflow (OF=1).
                return this.Program.Regs.RFlags.OF == true;
            case "JP": //Jump short if parity (PF=1).
                return this.Program.Regs.RFlags.PF == true;
            case "JPE": //Jump short if parity even (PF=1).
                return this.Program.Regs.RFlags.PF == true;
            case "JPO": //Jump short if parity odd (PF=0).
                return this.Program.Regs.RFlags.PF == false;
            case "JCXZ": //Jump short if CX register is 0.
                return this.Program.Regs.C.X.equals(Long.UZERO); // == 0;
            case "JS": //Jump short if sign (SF=1).
                return this.Program.Regs.RFlags.SF == true;
            case "JZ": //Jump short if zero (ZF = 1).
                return this.Program.Regs.RFlags.ZF == true;
        }
    }
}

class LOOP extends Statement {

    /* For conditional moves. */
    Condition: string;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null, condition: string) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.Condition = condition;

        this.GetParameterStatements(tokens, env);

    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var source: EvaluatedResult = this.parameters[0].Evaluate();

        if (this.parameters[0].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, source.DataSize);

        this.Program.Regs.C.E = this.Program.Regs.C.E.decrement();



        if (!this.Program.Regs.C.E.equals(Long.UZERO) && this.MeetsCondition()) {
            //if (this.AssignValueToTarget(source.Value, source.DataSize)) { }

            //this.Program.Labels

            this.Program.Regs.IP.E = source.Value;

            //this.Program.Regs.RFlags.SetFlags(target.DataSize, source.Value);
        }
        this.Program.postInstructionCallback(this, source);
        return source;
    }

    public MeetsCondition(): boolean {
        if (this.Condition == null)
            return true;

        switch (this.Condition.toUpperCase()) {
            default: //Decrement count; jump short if count ≠ 0.
            case "LOOPE": //Decrement count; jump short if count ≠ 0 and ZF = 1.
                return this.Program.Regs.RFlags.ZF == true;
            case "LOOPNE": //Decrement count; jump short if count ≠ 0 and ZF = 0.
                return this.Program.Regs.RFlags.ZF == false;
            case "LOOPNZ": //Jump short if not zero (ZF=0).
                return this.Program.Regs.RFlags.ZF == false;
            case "LOOPZ": //Jump short if zero (ZF = 1).
                return this.Program.Regs.RFlags.ZF == true;
        }
    }
}

class SAR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var cf: boolean = (target.Value.and(Long.UONE)).equals(Long.UONE);
        var targetval = target.Value;

        switch (tsize) {
            case 1:
                targetval = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                targetval = Statement.SignExtendUShort(target.Value);
                break;
            case 4:
                targetval = Statement.SignExtendUInt(target.Value);
                break;
            //no case 8:
    }
        var value = targetval;

        ///TODO: Should we be looking at the whole 64-bit thread blocking takes a super long time loop here?
        for (var i = 0; i < source.Value.getLowBits(); i++) {
            cf = value.and(Long.UONE).equals(Long.UONE);
            value = value.shiftRightUnsigned(1);

        }

        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.Regs.RFlags.CF = cf;

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class SHR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var cf: boolean = target.Value.and(Long.UONE).equals(Long.UONE);
        var targetval = target.Value;

        switch (tsize) {
            case 1:
                targetval = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                targetval = Statement.SignExtendUShort(target.Value);
                break;
            case 4:
                targetval = Statement.SignExtendUInt(target.Value);
                break;
            //no case 8:
        }

        var value = targetval;

        ///TODO: Should we be looking at the whole 64-bit thread blocking takes a super long time loop here?
        for (var i = 0; i < source.Value.getLowBits(); i++) {
            cf = value.and(Long.UONE).equals(Long.UONE);
            value = value.shiftRight(1);

        }
        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.Regs.RFlags.CF = cf;

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

 //The shift arithmetic left (SAL) and shift logical left (SHL) instructions perform the same operation
class SHL extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var cf: boolean;
        var targetval = target.Value;

        switch (tsize) {
            case 1:
                cf = (targetval.getLowBits() & 0x80) == 0x80;
                targetval = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                cf = (targetval.getLowBits() & 0x8000) == 0x8000;
                targetval = Statement.SignExtendUShort(target.Value);
                break;
            case 4:
                cf = (targetval.getHighBits() & 0x1) == 0x1;
                targetval = Statement.SignExtendUInt(target.Value);
                break;

        }

        var value = targetval;

        ///TODO: Should we be looking at the whole 64-bit thread blocking takes a super long time loop here?
        for (var i = 0; i < source.Value.getLowBits(); i++) {
            switch (tsize) {
                case 1:
                    cf = (value.getLowBits() & 0x80) == 0x80;
                    break;
                case 2:
                    cf = (value.getLowBits() & 0x8000) == 0x8000;
                    break;
                case 4:
                    cf = (targetval.getHighBits() & 0x1) == 0x1;
                    break;

            }
            value = value.shiftLeft(1);

        }

        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.Regs.RFlags.CF = cf;

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class ROL extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        var cf: boolean;
        var targetval = target.Value;

        switch (tsize) {
            case 1:
                targetval = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                targetval = Statement.SignExtendUShort(target.Value);
                break;
            case 4:
                targetval = Statement.SignExtendUInt(target.Value);
                break;
            //no case 8:
        }

        var value = targetval;

        for (var i = 0; i < source.Value.getLowBits(); i++) {
            switch (tsize) {
                case 1:
                    cf = (targetval.getLowBits() & 0x80) == 0x80;
                    break;
                case 2:
                    cf = (targetval.getLowBits() & 0x8000) == 0x8000;
                    break;
                case 4:
                    cf = (targetval.getLowBits() & 0x80000000) == 0x80000000;
                    break;
                case 8:
                    cf = (targetval.getHighBits() & 0x80000000) == 0x80000000;
                    break;

            }
            value = value.shiftLeft(1);

            if (cf)
                value = value.increment(); // += 1;
        }

        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class ROR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);
        
        var value = target.Value;

        for (var i = 0; i < source.Value.getLowBits(); i++) {
            var cf: boolean = false;
            if (value.and(Long.UONE).equals(Long.UONE))
                cf = true;

            value = value.shiftLeft(1);

            if (cf)
                switch (tsize) {
                    case 1:
                        value = value.or(new Long(0x80));
                        break;
                    case 2:
                        value = value.or(new Long(0x8000));
                        break;
                    case 4:
                        value = value.or(new Long(0x80000000));
                        break;
                    case 8:
                        value = value.maskHighBitsOr(0x80000000);
                        break;

                }
        }

        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}
class RCL extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var cf: boolean;
        var value = target.Value;

        switch (tsize) {
            case 1:
                value = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                value = Statement.SignExtendUShort(target.Value);
                break;
            case 4:
                value = Statement.SignExtendUInt(target.Value);
                break;
            //No case 8:
        }
        
        for (var i = 0; i < source.Value.getLowBits(); i++) {
            switch (tsize) {
                case 1:
                    cf = (value.getLowBits() & 0x80) == 0x80;
                    break;
                case 2:
                    cf = (value.getLowBits() & 0x8000) == 0x8000;
                    break;

            }
            value = value.shiftLeft(1);

        }

        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class RCR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var value = target.Value;

        for (var i = 0; i < source.Value.getLowBits(); i++) {
            var cf: boolean = false;
            if (value.and(Long.UONE).equals(Long.UONE))
                cf = true;

            value = value.shiftLeft(1);

            if (this.Program.Regs.RFlags.CF)
                switch (tsize) {
                    case 1:
                        value = value.maskLowBitsOr(0x80);
                        break;
                    case 2:
                        value = value.maskLowBitsOr(0x8000);
                        break;
                    case 4:
                        value = value.maskLowBitsOr(0x80000000);
                        break;
                    case 8:
                        value = value.maskHighBitsOr(0x80000000);
                        break;

                }

            this.Program.Regs.RFlags.CF = cf;
        }

        var result = new EvaluatedResult(target.Name, value, target.DataSize);

        if (this.AssignValueToTarget(value, tsize)) {
        }
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class BT extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);
        
        var targetval = target.Value;

        switch (tsize) {
            case 1:
                targetval = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                targetval = Statement.SignExtendUShort(target.Value);
                break;

        }

        var value = targetval;
        //var CF : boolean = (uint)(src >> (int)dst) & 1;

        //var isCarry: boolean = (value & (1 << source.Value - 1)) != 0;
        var isCarry: boolean = !(value.and(Long.UONE.shiftLeft(source.Value.decrement().getLowBits()))).equals(Long.UZERO);


        var result = new EvaluatedResult(target.Name, isCarry, target.DataSize);
        
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.Regs.RFlags.CF = isCarry;

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class BTS extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var targetval = target.Value;

        switch (tsize) {
            case 1:
                targetval = Statement.SignExtendByte(target.Value);
                break;
            case 2:
                targetval = Statement.SignExtendUShort(target.Value);
                break;

        }

        var value = targetval;
        //var CF : boolean = (uint)(src >> (int)dst) & 1;

        var isCarry: boolean = !(value.and(Long.UONE.shiftLeft(source.Value.decrement().getLowBits()))).equals(Long.UZERO);

        value = (value.or(Long.UONE.shiftLeft(source.Value.decrement().getLowBits())));

        this.AssignValueToTarget(value, tsize);

        var result = new EvaluatedResult(target.Name, isCarry, target.DataSize);

        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.Regs.RFlags.CF = isCarry;

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class BTR extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

        var targetval = target.Value;
        var mask : Long;
        switch (tsize) {
            case 1:
                targetval = Statement.SignExtendByte(target.Value);
                mask = Long.UByteMask;
                break;
            case 2:
                targetval = Statement.SignExtendUShort(target.Value);
                mask = Long.UShortMask;
                break;
            case 4:
                targetval = Statement.SignExtendUInt(target.Value);
                mask = Long.UIntMask;
                break;
            case 4:
                mask = Long.ULongMask;
                break;
        }

        var value = targetval;
        //var CF : boolean = (uint)(src >> (int)dst) & 1;

        var isCarry: boolean = !(value.and(Long.UONE.shiftLeft(source.Value.decrement().getLowBits()))).equals(Long.UZERO);

        mask = (Long.UONE.shiftLeft(source.Value.decrement().getLowBits())).not();
        value = value.and(mask);

        this.AssignValueToTarget(value, tsize);

        var result = new EvaluatedResult(target.Name, isCarry, target.DataSize);

        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, source.Value, target.Value);
        this.Program.Regs.RFlags.CF = isCarry;

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

enum CPUFeatures {
    CPUID_FEAT_ECX_SSE3 = 1 << 0,
    CPUID_FEAT_ECX_PCLMUL = 1 << 1,
    CPUID_FEAT_ECX_DTES64 = 1 << 2,
    CPUID_FEAT_ECX_MONITOR = 1 << 3,
    CPUID_FEAT_ECX_DS_CPL = 1 << 4,
    CPUID_FEAT_ECX_VMX = 1 << 5,
    CPUID_FEAT_ECX_SMX = 1 << 6,
    CPUID_FEAT_ECX_EST = 1 << 7,
    CPUID_FEAT_ECX_TM2 = 1 << 8,
    CPUID_FEAT_ECX_SSSE3 = 1 << 9,
    CPUID_FEAT_ECX_CID = 1 << 10,
    CPUID_FEAT_ECX_FMA = 1 << 12,
    CPUID_FEAT_ECX_CX16 = 1 << 13,
    CPUID_FEAT_ECX_ETPRD = 1 << 14,
    CPUID_FEAT_ECX_PDCM = 1 << 15,
    CPUID_FEAT_ECX_PCIDE = 1 << 17,
    CPUID_FEAT_ECX_DCA = 1 << 18,
    CPUID_FEAT_ECX_SSE4_1 = 1 << 19,
    CPUID_FEAT_ECX_SSE4_2 = 1 << 20,
    CPUID_FEAT_ECX_x2APIC = 1 << 21,
    CPUID_FEAT_ECX_MOVBE = 1 << 22,
    CPUID_FEAT_ECX_POPCNT = 1 << 23,
    CPUID_FEAT_ECX_AES = 1 << 25,
    CPUID_FEAT_ECX_XSAVE = 1 << 26,
    CPUID_FEAT_ECX_OSXSAVE = 1 << 27,
    CPUID_FEAT_ECX_AVX = 1 << 28,

    CPUID_FEAT_EDX_FPU = 1 << 0,
    CPUID_FEAT_EDX_VME = 1 << 1,
    CPUID_FEAT_EDX_DE = 1 << 2,
    CPUID_FEAT_EDX_PSE = 1 << 3,
    CPUID_FEAT_EDX_TSC = 1 << 4,
    CPUID_FEAT_EDX_MSR = 1 << 5,
    CPUID_FEAT_EDX_PAE = 1 << 6,
    CPUID_FEAT_EDX_MCE = 1 << 7,
    CPUID_FEAT_EDX_CX8 = 1 << 8,
    CPUID_FEAT_EDX_APIC = 1 << 9,
    CPUID_FEAT_EDX_SEP = 1 << 11,
    CPUID_FEAT_EDX_MTRR = 1 << 12,
    CPUID_FEAT_EDX_PGE = 1 << 13,
    CPUID_FEAT_EDX_MCA = 1 << 14,
    CPUID_FEAT_EDX_CMOV = 1 << 15,
    CPUID_FEAT_EDX_PAT = 1 << 16,
    CPUID_FEAT_EDX_PSE36 = 1 << 17,
    CPUID_FEAT_EDX_PSN = 1 << 18,
    CPUID_FEAT_EDX_CLF = 1 << 19,
    CPUID_FEAT_EDX_DTES = 1 << 21,
    CPUID_FEAT_EDX_ACPI = 1 << 22,
    CPUID_FEAT_EDX_MMX = 1 << 23,
    CPUID_FEAT_EDX_FXSR = 1 << 24,
    CPUID_FEAT_EDX_SSE = 1 << 25,
    CPUID_FEAT_EDX_SSE2 = 1 << 26,
    CPUID_FEAT_EDX_SS = 1 << 27,
    CPUID_FEAT_EDX_HTT = 1 << 28,
    CPUID_FEAT_EDX_TM1 = 1 << 29,
    CPUID_FEAT_EDX_IA64 = 1 << 30,
    CPUID_FEAT_EDX_PBE = 1 << 31
};

///TODO: Yay super detailed info about CPU. Ugh not implmeneting today!
class CPUID extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        //No Parameters.
        //this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        
        //this.AssignValueToTarget(value, tsize);

        //var result = new EvaluatedResult(target.Name, isCarry, target.DataSize);

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        //this.Program.Regs.RFlags.CF = isCarry;

        switch (this.Program.Regs.A.E.getLowBits()) {
            case 0:
                this.Program.Regs.A.E = Long.UZERO; //Highest basic function input value understood by CPUID;
                this.Program.Regs.B.E = new Long(0x756E6547); // 'u' 'n' 'e' 'G' //Vendor identification string;
                this.Program.Regs.D.E = new Long(0x49656E69); //'I' 'e' 'n' 'i' //Vendor identification string;
                this.Program.Regs.C.E = new Long(0x6C65746E); //'l' 'e' 't' 'n' //Vendor identification string;
                break;
            case 1: //https://www.felixcloutier.com/x86/cpuid#fig-3-6
                this.Program.Regs.A.E = new Long(0x1EA1);
                this.Program.Regs.D.E = Long.UZERO; //'FPU  VME  DE   PSE  TSC  MSR  PAE  MCE  CX8  APIC RESV SEP  MTRR PGE  MCA  CMOV PAT PSE3 PSN  CLFS RESV DS   ACPI MMX FXSR SSE  SSE2 SS   HTT  TM   RESV PBE '
                
                //EAX[3: 0]← Stepping ID;
                //EAX[7: 4]← Model;
                //EAX[11: 8]← Family;
                //EAX[13: 12]← Processor type;
                //EAX[15: 14]← Reserved;
                //EAX[19: 16]← Extended Model;
                //EAX[27: 20]← Extended Family;
                //EAX[31: 28]← Reserved;
                //EBX[7: 0]← Brand Index; (* Reserved if the value is zero. *)
                //EBX[15: 8]← CLFLUSH Line Size;
                //EBX[16: 23]← Reserved; (* Number of threads enabled = 2 if MT enable fuse set. *)
                //EBX[24: 31]← Initial APIC ID;
                //ECX ← Feature flags; (* See Figure 3 - 7. *)
                //EDX ← Feature flags; (* See Figure 3 - 8. *)
                break;
            case 2:
                //The first member of the family of Pentium 4 processors returns the following information about caches and TLBs when the CPUID executes with an input value of 2:
                /*
                 Which means:

The least-significant byte (byte 0) of register EAX is set to 01H. This value should be ignored.
The most-significant bit of all four registers (EAX, EBX, ECX, and EDX) is set to 0, indicating that each register contains valid 1-byte descriptors.
Bytes 1, 2, and 3 of register EAX indicate that the processor has:
50H - a 64-entry instruction TLB, for mapping 4-KByte and 2-MByte or 4-MByte pages.
50H - a 64-entry instruction TLB, for mapping 4-KByte and 2-MByte or 4-MByte pages.
5BH - a 64-entry data TLB, for mapping 4-KByte and 4-MByte pages.
5BH - a 64-entry data TLB, for mapping 4-KByte and 4-MByte pages.
66H - an 8-KByte 1st level data cache, 4-way set associative, with a 64-Byte cache line size.
66H - an 8-KByte 1st level data cache, 4-way set associative, with a 64-Byte cache line size.
The descriptors in registers EBX and ECX are valid, but contain NULL descriptors.
Bytes 0, 1, 2, and 3 of register EDX indicate that the processor has:
00H - NULL descriptor.
00H - NULL descriptor.
70H - Trace cache: 12 K-μop, 8-way set associative.
70H - Trace cache: 12 K-μop, 8-way set associative.
7AH - a 256-KByte 2nd level cache, 8-way set associative, with a sectored, 64-byte cache line size.
7AH - a 256-KByte 2nd level cache, 8-way set associative, with a sectored, 64-byte cache line size.
00H - NULL descriptor.
00H - NULL descriptor.
*/
                this.Program.Regs.A.E = new Long(0x665B5001); // ← Cache and TLB information;
                this.Program.Regs.B.E = Long.UZERO; // ← Cache and TLB information;
                this.Program.Regs.C.E = Long.UZERO;// ← Cache and TLB information;
                this.Program.Regs.D.E = new Long(0x007A7000);// ← Cache and TLB information;
                break;
            case 3:
                this.Program.Regs.A.E = Long.UZERO; // EAX ← Reserved;
                this.Program.Regs.B.E = Long.UZERO; // EBX ← Reserved;
                this.Program.Regs.B.E = Long.UZERO; // ECX ← ProcessorSerialNumber[31: 0]; (* Pentium III processors only, otherwise reserved. *)
                this.Program.Regs.B.E = Long.UZERO; // EDX ← ProcessorSerialNumber[63: 32]; (* Pentium III processors only, otherwise reserved. *
                    break;
            //case  4:
            //    EAX ← Deterministic Cache Parameters Leaf; (* See Table 3 - 8. *)
            //    EBX ← Deterministic Cache Parameters Leaf;
            //    ECX ← Deterministic Cache Parameters Leaf;
            //    EDX ← Deterministic Cache Parameters Leaf;
            //    break;
            //case 5:
            //    EAX ← MONITOR / MWAIT Leaf; (* See Table 3 - 8. *)
            //    EBX ← MONITOR / MWAIT Leaf;
            //    ECX ← MONITOR / MWAIT Leaf;
            //    EDX ← MONITOR / MWAIT Leaf;
            //    break;
            //case  6:
            //    EAX ← Thermal and Power Management Leaf; (* See Table 3 - 8. *)
            //    EBX ← Thermal and Power Management Leaf;
            //    ECX ← Thermal and Power Management Leaf;
            //    EDX ← Thermal and Power Management Leaf;
            //    break;
            //case  7:
            //    EAX ← Structured Extended Feature Flags Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Structured Extended Feature Flags Enumeration Leaf;
            //    ECX ← Structured Extended Feature Flags Enumeration Leaf;
            //    EDX ← Structured Extended Feature Flags Enumeration Leaf;
            //    break;
            //case  8:
            //    this.Program.Regs.A.E = 0; //EAX ← Reserved = 0;
            //    this.Program.Regs.B.E = 0; //EBX ← Reserved = 0;
            //    this.Program.Regs.C.E = 0; //ECX ← Reserved = 0;
            //    this.Program.Regs.D.E = 0; //EDX ← Reserved = 0;
            //    break;
            //case  9:
            //    EAX ← Direct Cache Access Information Leaf; (* See Table 3 - 8. *)
            //    EBX ← Direct Cache Access Information Leaf;
            //    ECX ← Direct Cache Access Information Leaf;
            //    EDX ← Direct Cache Access Information Leaf;
            //    break;
            //case 0xA:
            //    EAX ← Architectural Performance Monitoring Leaf; (* See Table 3 - 8. *)
            //    EBX ← Architectural Performance Monitoring Leaf;
            //    ECX ← Architectural Performance Monitoring Leaf;
            //    EDX ← Architectural Performance Monitoring Leaf;
            //    break
            //case 0xB:
            //    EAX ← Extended Topology Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Extended Topology Enumeration Leaf;
            //    ECX ← Extended Topology Enumeration Leaf;
            //    EDX ← Extended Topology Enumeration Leaf;
            //    break;
            //case 0xC:
            //    this.Program.Regs.A.E = 0; //EAX ← Reserved = 0;
            //    this.Program.Regs.B.E = 0; //EBX ← Reserved = 0;
            //    this.Program.Regs.C.E = 0; //ECX ← Reserved = 0;
            //    this.Program.Regs.D.E = 0; //EDX ← Reserved = 0;
            //    break;
            //case 0xD:
            //    EAX ← Processor Extended State Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Processor Extended State Enumeration Leaf;
            //    ECX ← Processor Extended State Enumeration Leaf;
            //    EDX ← Processor Extended State Enumeration Leaf;
            //    break;
            //case 0xE:
            //    this.Program.Regs.A.E = 0; //EAX ← Reserved = 0;
            //    this.Program.Regs.B.E = 0; //EBX ← Reserved = 0;
            //    this.Program.Regs.C.E = 0; //ECX ← Reserved = 0;
            //    this.Program.Regs.D.E = 0; //EDX ← Reserved = 0;
            //    break;
            //case 0xF:
            //    EAX ← Intel Resource Director Technology Monitoring Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Intel Resource Director Technology Monitoring Enumeration Leaf;
            //    ECX ← Intel Resource Director Technology Monitoring Enumeration Leaf;
            //    EDX ← Intel Resource Director Technology Monitoring Enumeration Leaf;
            //    break;
            //case 0x10:
            //    EAX ← Intel Resource Director Technology Allocation Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Intel Resource Director Technology Allocation Enumeration Leaf;
            //    ECX ← Intel Resource Director Technology Allocation Enumeration Leaf;
            //    EDX ← Intel Resource Director Technology Allocation Enumeration Leaf;
            //    break;
            //case 0x12:
            //    EAX ← Intel SGX Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Intel SGX Enumeration Leaf;
            //    ECX ← Intel SGX Enumeration Leaf;
            //    EDX ← Intel SGX Enumeration Leaf;
            //    break;
            //case 0x14:
            //    EAX ← Intel Processor Trace Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Intel Processor Trace Enumeration Leaf;
            //    ECX ← Intel Processor Trace Enumeration Leaf;
            //    EDX ← Intel Processor Trace Enumeration Leaf;
            //    break;
            //case 0x15:
            //    EAX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf; (* See Table 3 - 8. *)
            //    EBX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf;
            //    ECX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf;
            //    EDX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf;
            //    break;
            //case 0x16:
            //    EAX ← Processor Frequency Information Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Processor Frequency Information Enumeration Leaf;
            //    ECX ← Processor Frequency Information Enumeration Leaf;
            //    EDX ← Processor Frequency Information Enumeration Leaf;
            //    break;
            //case 0x17:
            //    EAX ← System - On - Chip Vendor Attribute Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← System - On - Chip Vendor Attribute Enumeration Leaf;
            //    ECX ← System - On - Chip Vendor Attribute Enumeration Leaf;
            //    EDX ← System - On - Chip Vendor Attribute Enumeration Leaf;
            //    break;
            //case 0x18:
            //    EAX ← Deterministic Address Translation Parameters Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← Deterministic Address Translation Parameters Enumeration Leaf;
            //    ECX ←Deterministic Address Translation Parameters Enumeration Leaf;
            //    EDX ← Deterministic Address Translation Parameters Enumeration Leaf;
            //    break;
            //case 0x1F:
            //    EAX ← V2 Extended Topology Enumeration Leaf; (* See Table 3 - 8. *)
            //    EBX ← V2 Extended Topology Enumeration Leaf;
            //    ECX ← V2 Extended Topology Enumeration Leaf;
            //    EDX ← V2 Extended Topology Enumeration Leaf;
            //    break;
            case 0x80000000:
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Highest extended function input value understood by CPUID;
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Reserved = 0;
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Reserved = 0;
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Reserved = 0;
                break;
            case 0x80000001:
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Reserved = 0;
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Reserved = 0;
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Extended Feature Bits(* See Table 3 - 8. *);
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Extended Feature Bits(* See Table 3 - 8. *);
                break;
            case 0x80000002:
                this.Program.Regs.A.E = new Long(0x65746E49); //EAX ← Processor Brand String; //    
                this.Program.Regs.B.E = new Long(0x2952286C); //EBX ← Processor Brand String, continued; //
                this.Program.Regs.C.E = new Long(0x726F4320); //ECX ← Processor Brand String, continued; //
                this.Program.Regs.D.E = new Long(0x4D542865); //EDX ← Processor Brand String, continued; //
                break;
            case 0x0000003:
                this.Program.Regs.A.E = new Long(0x37692029); //EAX ← Processor Brand String, continued; //  
                this.Program.Regs.B.E = new Long(0x3237342D); //EBX ← Processor Brand String, continued; //
                this.Program.Regs.C.E = new Long(0x00514830); //ECX ← Processor Brand String, continued; //
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Processor Brand String, continued;
                break;
            case 0x80000004:
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Processor Brand String, continued;
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Processor Brand String, continued;
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Processor Brand String, continued;
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Processor Brand String, continued;
                break;
            case 0x80000005:
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Reserved = 0;
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Reserved = 0;
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Reserved = 0;
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Reserved = 0;
                break;
            case 0x80000006:
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Reserved = 0;
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Reserved = 0;
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Cache information;
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Reserved = 0;
                break;
            case 0x80000007:
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Reserved = 0;
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Reserved = 0;
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Reserved = 0;
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Reserved = Misc Feature Flags;
                break;
            case 0x80000008:
                this.Program.Regs.A.E = new Long(0xF7800000); //EAX ← Reserved = Physical Address Size Information; (Today we pick 4Gb)
                this.Program.Regs.B.E = new Long(0xF7800000); //EBX ← Reserved = Virtual Address Size Information; (Today we pick 4Gb)
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Reserved = 0;
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Reserved = 0;
                break;
                //EAX >= 40000000H and EAX <= 4FFFFFFFH:
                default: //(* EAX = Value outside of recognized range for CPUID. *)
                    //(* If the highest basic information leaf data depend on ECX input value, ECX is honored.*)
                this.Program.Regs.A.E = Long.UZERO; //EAX ← Reserved; (* Information returned for highest basic information leaf. *)
                this.Program.Regs.B.E = Long.UZERO; //EBX ← Reserved; (* Information returned for highest basic information leaf. *)
                this.Program.Regs.C.E = Long.UZERO; //ECX ← Reserved; (* Information returned for highest basic information leaf. *)
                this.Program.Regs.D.E = Long.UZERO; //EDX ← Reserved; (* Information returned for highest basic information leaf. *)
                break;
        }
        var result = new EvaluatedResult();
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class INT extends Statement {
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, tokens: Token[], env: Program = null, num: number = -1) {
        super(preInstructionCallback, postInstructionCallback, tokens[env.index], env);

        if (num > 0) {
            var sp = new StatementParameter(env);
            var t = new Token();
            t.Value = num.toString();
            t.TokenIndex = this.Token.TokenIndex;
            t.TokenLength = this.Token.TokenLength;
            t.TokenType = TokenTypes.Number;

            sp.Parameter = new NumberValue(preInstructionCallback, postInstructionCallback, t, env);
            this.parameters.push(sp);

        }
        else
            this.GetParameterStatements(tokens, env);
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        //var source: EvaluatedResult = this.parameters[1].Evaluate();

        //var size = Statement.Size(target.DataSize, this.parameters[0].TargetIsRegister, source.DataSize, this.parameters[1].TargetIsRegister);
        //if (!this.parameters[1].TargetIsRegister)
        //    source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, size);

        //var targetval = target.Value;

        this.Program.interruptTable[target.Value.getLowBits()](this.Program);

        var result = new EvaluatedResult(target.Name, target.Value, target.DataSize);

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        //this.Program.Regs.RFlags.CF = isCarry;

        //interruptTable

        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class LODS extends Statement {
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize : number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        //If there is a paraemeter it will specify the size (number of bytes) to read from memory. But the actual value is ignored and SI is used.
        this.GetParameterStatements(t, env);

        if (this.parameters.length > 0) {
            this.size = this.parameters[0].TargetSize;
        }
        else
            this.size = loadsize;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        
        switch (this.size) {
            case 1:
                this.Program.Regs.A.L = this.Program.Mem.ReadMemory1Byte(this.Program.Regs.SI.E); //(* Byte load *)

                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.L, Long.UZERO);

                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.SI.E = this.Program.Regs.SI.E.add(Long.UONE); }
                else { this.Program.Regs.SI.E = this.Program.Regs.SI.E.subtract(Long.UONE); }
                break;
            case 2:
                this.Program.Regs.A.X = this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.SI.E); // (* Word load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.X, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.SI.E = this.Program.Regs.SI.E.add(new Long(2)); }
                else { this.Program.Regs.SI.E = this.Program.Regs.SI.E.subtract(new Long(2)); }
                break;
            case 4:
                this.Program.Regs.A.E = this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.SI.E); // (* Doubleword load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.E, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.SI.E = this.Program.Regs.SI.E.add(new Long(4)); }
                else { this.Program.Regs.SI.E = this.Program.Regs.SI.E.subtract(new Long(4)); }
                break;
            case 8:
                this.Program.Regs.A.R = this.Program.Mem.ReadMemory8Bytes(this.Program.Regs.SI.E); // (* Quadword load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.R, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(8)); }
                else { this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(8)); }
                break;
        }

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class STOS extends Statement {
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize : number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        //If there is a paraemeter it will specify the size (number of bytes) to read from memory. But the actual value is ignored and SI is used.
        this.GetParameterStatements(t, env);

        if (this.parameters.length > 0) {
            this.size = this.parameters[0].TargetSize;
        }
        else
            this.size = loadsize;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);

        switch (this.size) {
            case 1:
                this.Program.Mem.WriteMemory1Byte(this.Program.Regs.DI.E, this.Program.Regs.A.L); //(* Byte load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.L, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.E = this.Program.Regs.DI.E.add(Long.UONE); }
                else { this.Program.Regs.DI.E = this.Program.Regs.DI.E.subtract(Long.UONE); }
                break;
            case 2:
                this.Program.Mem.WriteMemory2Bytes(this.Program.Regs.DI.E, this.Program.Regs.A.X); // (* Word load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.X, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.E = this.Program.Regs.DI.E.add(new Long(2)); }
                else { this.Program.Regs.DI.E = this.Program.Regs.DI.E.subtract(new Long(2)); }
                break;
            case 4:
                this.Program.Mem.WriteMemory4Bytes(this.Program.Regs.DI.E, this.Program.Regs.A.E); // (* Doubleword load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.E, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.E = this.Program.Regs.DI.E.add(new Long(4)); }
                else { this.Program.Regs.DI.E = this.Program.Regs.DI.E.subtract(new Long(4)); }
                break;
            case 8:
                this.Program.Mem.WriteMemory8Bytes(this.Program.Regs.DI.E, this.Program.Regs.A.R); // (* Quadword load *)
                this.Program.Regs.RFlags.SetFlags(this.size, this.Program.Regs.A.R, Long.UZERO);
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(8)); }
                else { this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(8)); }
                break;
        }

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class REP extends Statement {
    public instruction: Statement;
    public repType: string;
    public size: number = 4;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, reptype: string = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        this.repType = reptype;
        var mnemonic = t[this.Program.index++].Value.toUpperCase();

        if (!this.Program.mnemonicBuilders[mnemonic]) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: Unknown instruction (" + mnemonic + ") in " + reptype.toUpperCase() + "! near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }

        this.instruction = this.Program.mnemonicBuilders[mnemonic](this.Program, t);

        //ins.Address = new Long(this.Program.InstructionCount);
        //this.Program.InstructionCount += 4;

        if (reptype.toUpperCase() == "REPE" ||
            reptype.toUpperCase() == "REPZ" ||
            reptype.toUpperCase() == "REPNE" ||
            reptype.toUpperCase() == "REPNZ") {

            if (!(this.instruction instanceof CMPS) &&
                !(this.instruction instanceof SCAS)) {
                this.Program.failedToken = this.Token;
                throw new Error("Error: " + reptype.toUpperCase() + " instruction only compatible with: CMPS or SCAS! near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
            }
        }
        else if (!(this.instruction instanceof INS) &&
            !(this.instruction instanceof MOVS) &&
            !(this.instruction instanceof OUTS) &&
            !(this.instruction instanceof LODS) &&
            !(this.instruction instanceof STOS)) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: REP instruction only compatible with: MOVS, INS, OUTS, LODS, or STOS! near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }

        if ((this.instruction instanceof INS) ||
            (this.instruction instanceof MOVS) ||
            (this.instruction instanceof OUTS) ||
            (this.instruction instanceof LODS) ||
            (this.instruction instanceof STOS) ||
            (this.instruction instanceof CMPS) ||
            (this.instruction instanceof SCAS)) {
            this.size = this.instruction.size;
        }

        /*
         INS
         MOVS
         OUTS
         LODS
         STOS
         CMPS
         SCAS
         
         */

    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("REP " + this.instruction.FriendlyName);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        
        while (!this.meetsBreakCondition(this.size)) {
            this.instruction.Evaluate().DataSize;

            switch (this.size) {
                case 2:
                    this.Program.Regs.C.X = this.Program.Regs.C.X.subtract(Long.UONE);
                    break;
                case 8:
                    this.Program.Regs.C.R = this.Program.Regs.C.R.subtract(Long.UONE);
                    break;
                default:
                    this.Program.Regs.C.E = this.Program.Regs.C.E.subtract(Long.UONE);
                    break;
            }
        }


        this.Program.postInstructionCallback(this, result);
        return result;
    }

    meetsBreakCondition(size: number): boolean {

        switch (size) {
            case 2:
                if (this.Program.Regs.C.X.equals(Long.UZERO))
                    return true;
            case 8:
                if (this.Program.Regs.C.R.equals(Long.UZERO))
                    return true;
            default:
                if (this.Program.Regs.C.E.equals(Long.UZERO))
                    return true;
        }


        switch (this.repType) {
            //case "":
            //case null:
            //case "REP":
            case "REPE":
            case "REPZ":
                if (!this.Program.Regs.RFlags.ZF)
                    return true;
                break;
            case "REPNE":
            case "REPNZ":
                if (this.Program.Regs.RFlags.ZF)
                    return true;
                break;
        }

        return false;
    }

}

class MOVS extends Statement {
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize: number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        //If there is a paraemeter it will specify the size (number of bytes) to read from memory. But the actual value is ignored and SI is used.
        this.GetParameterStatements(t, env);

        if (this.parameters.length > 0) {
            this.size = this.parameters[0].TargetSize;
        }
        else
            this.size = loadsize;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);

        var data : Long = null;

        switch (this.size) {
            case 1: //(Byte move)
                data = this.Program.Mem.ReadMemory1Byte(this.Program.Regs.SI.R);
                this.Program.Mem.WriteMemory1Byte(this.Program.Regs.DI.R, data);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(Long.UONE);
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(Long.UONE);
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(Long.UONE);
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(Long.UONE);
                }
                break;
            case 2: //(Word move)
                data = this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.SI.R);
                this.Program.Mem.WriteMemory2Bytes(this.Program.Regs.DI.R, data);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(2));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(2));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(2));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(2));
                }
                break;
            case 4: //(Doubleword move)
                data = this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.SI.R);
                this.Program.Mem.WriteMemory4Bytes(this.Program.Regs.DI.R, data);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(4));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(4));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(4));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(4));
                }
                break;
            case 8: //(Quadword move)
                data = this.Program.Mem.ReadMemory8Bytes(this.Program.Regs.SI.R);
                this.Program.Mem.WriteMemory8Bytes(this.Program.Regs.DI.R, data);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(8));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(8));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(8));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(8));
                }
        }

        this.Program.Regs.RFlags.SetFlags(this.size, data, Long.UZERO);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

//Read from IO Port. Not implemented.
class INS extends Statement {
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize: number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        this.Program.failedToken = this.Token;
        throw new Error("INS instruction not implemented! near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());

        //If there is a paraemeter it will specify the size (number of bytes) to read from memory. But the actual value is ignored and DI is used.
        this.GetParameterStatements(t, env);

        if (this.parameters.length > 0) {
            this.size = this.parameters[0].TargetSize;
        }
        else
            this.size = loadsize;
    }

    //TODO: Implement IO ports. 

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();

       

        var data: Long;
        switch (this.size) {
            case 1: //(Byte transfer)
                data = this.Program.Mem.ReadMemory1Byte(this.Program.Regs.D.X); //<- This should be reading from Port(DX) 
                this.Program.Mem.WriteMemory1Byte(this.Program.Regs.DI.E, data); //(* Byte load *)
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(Long.UONE); }
                else { this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(Long.UONE); }
                break;
            case 2: //(Word transfer)
                data = this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.D.X);
                this.Program.Mem.WriteMemory2Bytes(this.Program.Regs.DI.E, data); //(* Byte load *)
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.E = this.Program.Regs.DI.E.add(new Long(2)); }
                else { this.Program.Regs.DI.E = this.Program.Regs.DI.E.subtract(new Long(2)); }
                break;
            case 4: //(* Doubleword transfer *)
                data = this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.D.X);
                this.Program.Mem.WriteMemory4Bytes(this.Program.Regs.DI.E, data); //(* Byte load *)
                if (!this.Program.Regs.RFlags.DF) { this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(4)); }
                else { this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(4)); }
                break;
        }
        this.Program.Regs.RFlags.SetFlags(this.size, data, Long.UZERO);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

//Write to IO Port. Not implemented.
class OUTS extends Statement{
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize: number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);


        this.Program.failedToken = this.Token;
        throw new Error("OUTS instruction not implemented! near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());

        //If there is a paraemeter it will specify the size (number of bytes) to read from memory. But the actual value is ignored and SI is used.
        this.GetParameterStatements(t, env);

        if (this.parameters.length > 0) {
            this.size = this.parameters[0].TargetSize;
        }
        else
            this.size = loadsize;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value, Long.UZERO);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class CMPS extends Statement {
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize: number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);

        var si: Long;
        var di: Long;

        switch (this.size) {
            case 1: //(Byte move)
                si = this.Program.Mem.ReadMemory1Byte(this.Program.Regs.SI.R);
                di = this.Program.Mem.ReadMemory1Byte(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(Long.UONE);
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(Long.UONE);
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(Long.UONE);
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(Long.UONE);
                }
                break;
            case 2: //(Word move)
                si = this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.SI.R);
                di = this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(2));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(2));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(2));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(2));
                }
                break;
            case 4: //(Doubleword move)
                si = this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.SI.R);
                di = this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(4));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(4));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(4));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(4));
                }
                break;
            case 8: //(Quadword move)
                si = this.Program.Mem.ReadMemory8Bytes(this.Program.Regs.SI.R);
                di = this.Program.Mem.ReadMemory8Bytes(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(8));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(8));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(8));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(8));
                }
        }


        var value = si.subtract(di);
        var result = new EvaluatedResult("CMPS", value, this.size);

        this.Program.Regs.RFlags.SetFlags(this.size, value, si, di);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class SCAS extends Statement {
    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, loadsize: number = 8) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        //If there is a paraemeter it will specify the size (number of bytes) to read from memory. But the actual value is ignored and SI is used.
        this.GetParameterStatements(t, env);

        if (this.parameters.length > 0) {
            this.size = this.parameters[0].TargetSize;
        }
        else
            this.size = loadsize;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();


        var a: Long;
        var di: Long;

        switch (this.size) {
            case 1: //(Byte move)
                a = this.Program.Regs.A.L;
                di = this.Program.Mem.ReadMemory1Byte(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(Long.UONE);
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(Long.UONE);
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(Long.UONE);
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(Long.UONE);
                }
                break;
            case 2: //(Word move)
                a = this.Program.Regs.A.X;
                di = this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(2));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(2));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(2));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(2));
                }
                break;
            case 4: //(Doubleword move)
                a = this.Program.Regs.A.E;
                di = this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(4));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(4));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(4));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(4));
                }
                break;
            case 8: //(Quadword move)
                a = this.Program.Regs.A.R;
                di = this.Program.Mem.ReadMemory8Bytes(this.Program.Regs.DI.R);
                if (!this.Program.Regs.RFlags.DF) {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.add(new Long(8));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.add(new Long(8));
                }
                else {
                    this.Program.Regs.SI.R = this.Program.Regs.SI.R.subtract(new Long(8));
                    this.Program.Regs.DI.R = this.Program.Regs.DI.R.subtract(new Long(8));
                }
        }


        var value = a.subtract(di);
        var result = new EvaluatedResult("SCAS", value, this.size);

        this.Program.Regs.RFlags.SetFlags(this.size, value, a, di);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class SETcc extends Statement {
    public Condition: string;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, condition: string) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        this.GetParameterStatements(t, env);
        this.Condition = condition;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);

        var val: Long = Long.UZERO.copy(); 

        switch (this.Condition.toUpperCase()) {
            case "SETA":
                if (this.Program.Regs.RFlags.CF == false && this.Program.Regs.RFlags.ZF == false)
                    val = Long.UONE.copy();
                break;
            case "SETAE":
                if (this.Program.Regs.RFlags.CF == false)
                    val = Long.UONE.copy();
                break;
            case "SETB":
                if (this.Program.Regs.RFlags.CF == true)
                    val = Long.UONE.copy();
                break;
            case "SETBE":
                if (this.Program.Regs.RFlags.CF == true || this.Program.Regs.RFlags.ZF == true)
                    val = Long.UONE.copy();
                break;
            case "SETC":
                if (this.Program.Regs.RFlags.CF == true)
                    val = Long.UONE.copy();
                break;
            case "SETE":
                if (this.Program.Regs.RFlags.ZF == true)
                    val = Long.UONE.copy();
                break;
            case "SETG":
                if (this.Program.Regs.RFlags.ZF == false && this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETGE":
                if (this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETL":
                if (this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETLE":
                if (this.Program.Regs.RFlags.ZF == true || this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETNA":
                if (this.Program.Regs.RFlags.CF == true || this.Program.Regs.RFlags.ZF == true)
                    val = Long.UONE.copy();
                break;
            case "SETNAE":
                if (this.Program.Regs.RFlags.CF == true)
                    val = Long.UONE.copy();
                break;
            case "SETNB":
                if (this.Program.Regs.RFlags.CF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNBE":
                if (this.Program.Regs.RFlags.CF == false && this.Program.Regs.RFlags.ZF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNC":
                if (this.Program.Regs.RFlags.CF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNE":
                if (this.Program.Regs.RFlags.ZF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNG":
                if (this.Program.Regs.RFlags.ZF == true || this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETNGE":
                if (this.Program.Regs.RFlags.SF != this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETNL":
                if (this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETNLE":
                if (this.Program.Regs.RFlags.ZF == false && this.Program.Regs.RFlags.SF == this.Program.Regs.RFlags.OF)
                    val = Long.UONE.copy();
                break;
            case "SETNO":
                if (this.Program.Regs.RFlags.OF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNP":
                if (this.Program.Regs.RFlags.PF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNS":
                if (this.Program.Regs.RFlags.SF == false)
                    val = Long.UONE.copy();
                break;
            case "SETNZ":
                if (this.Program.Regs.RFlags.ZF == false)
                    val = Long.UONE.copy();
                break;
            case "SETO":
                if (this.Program.Regs.RFlags.OF == true)
                    val = Long.UONE.copy();
                break;
            case "SETP":
                if (this.Program.Regs.RFlags.PF == true)
                    val = Long.UONE.copy();
                break;
            case "SETPE":
                if (this.Program.Regs.RFlags.PF == true)
                    val = Long.UONE.copy();
                break;
            case "SETPO":
                if (this.Program.Regs.RFlags.PF == false)
                    val = Long.UONE.copy();
                break;
            case "SETS":
                if (this.Program.Regs.RFlags.SF == true)
                    val = Long.UONE.copy();
                break;
            case "SETZ":
                if (this.Program.Regs.RFlags.ZF == true)
                    val = Long.UONE.copy();
                break;
        }

        this.AssignValueToTarget(val, 1);
        
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class CLD extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("CLD", 0, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.DF = false;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class STD extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("STD", 1, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.DF = true;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class CLC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("CLC", 0, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.CF = false;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class STC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("CLC", 1, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.CF = true;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class CLI extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("CLI", 0, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.IF = false;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class STI extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("STI", 1, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.IF = true;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class CLAC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("CLAC", 0, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.AC = false;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class STAC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("STAC", 1, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.Regs.RFlags.AC = true;
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class SignExtendStatement extends Statement {
    public Size : number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, size: number) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;

        this.Size = size;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result;

        switch (this.Size) {
            case 1:
                this.Program.Regs.A.X = Statement.SignExtendByte(this.Program.Regs.A.L);
                this.Program.Regs.RFlags.SetFlags(this.Size, this.Program.Regs.A.X, this.Program.Regs.A.X);
                result = new EvaluatedResult("CBW", this.Program.Regs.A.X, 2);
               break;
            case 2:
                this.Program.Regs.A.E = Statement.SignExtendUShort(this.Program.Regs.A.X);
                this.Program.Regs.RFlags.SetFlags(this.Size, this.Program.Regs.A.E, this.Program.Regs.A.E);
                result = new EvaluatedResult("CWDE", this.Program.Regs.A.E, 4);
                break;
            case 4:
                this.Program.Regs.A.R = Statement.SignExtendUInt(this.Program.Regs.A.E);
                this.Program.Regs.RFlags.SetFlags(this.Size, this.Program.Regs.A.R, this.Program.Regs.A.R);
                result = new EvaluatedResult("CDQE", this.Program.Regs.A.R, 8);
                break;
            case 0x20:
                if (this.Program.Regs.A.X.and(Long.UShortEighty).equals(Long.UShortEighty))
                    this.Program.Regs.D.X = Long.MAX_UNSIGNED_VALUE; //DX: AX ← sign - extend of AX.
                this.Program.Regs.RFlags.SetFlags(this.Size, this.Program.Regs.A.R, this.Program.Regs.A.R);
                result = new EvaluatedResult("CWD", this.Program.Regs.A.R, 8);
                break;
            case 0x40:
                if (this.Program.Regs.A.X.and(Long.UIntEighty).equals(Long.UIntEighty))
                    this.Program.Regs.D.E = Long.MAX_UNSIGNED_VALUE; //EDX: EAX ← sign - extend of EAX.
                this.Program.Regs.RFlags.SetFlags(this.Size, this.Program.Regs.A.R, this.Program.Regs.A.R);
                result = new EvaluatedResult("CDQ", this.Program.Regs.A.R, 8);
                break;
            case 0x80:
                if (this.Program.Regs.A.X.and(Long.ULongEighty).equals(Long.ULongEighty))
                    this.Program.Regs.D.R = Long.MAX_UNSIGNED_VALUE; //RDX: RAX← sign - extend of RAX.

                this.Program.Regs.RFlags.SetFlags(this.Size, this.Program.Regs.A.R, this.Program.Regs.A.R);
                result = new EvaluatedResult("CQO", this.Program.Regs.A.R, 8);
                break;
        }

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class CMC extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        this.Program.Regs.RFlags.CF = !this.Program.Regs.RFlags.CF;
        var result = new EvaluatedResult("CMC", this.Program.Regs.RFlags.CF, 1);
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class BSF extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        //env.index++;

        this.GetParameterStatements(t, env);

        if (this.parameters.length != 2) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: BSF requires two parameters. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("BSF", 1, 1);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        if (source.Value.equals( Long.UZERO))
        {
            this.Program.Regs.RFlags.ZF = true;
            //target is undefined;
            result = new EvaluatedResult("BSF", 0, 1);
        }
        else
        {
            this.Program.Regs.RFlags.ZF = false;
            var count = 0;

            if (ssize < 8) {
                var val = source.Value.getLowBits();

                while ((val >> 1 & 1) == 0 && count < ssize*8) {
                    count++;
                }
                this.AssignValueToTarget(new Long(count), tsize);
            }
            else {
                while (source.Value.shiftRight(count).maskLowBitsAnd(1).equals(Long.UONE) && count < ssize * 8){
                    count++;
                }
                this.AssignValueToTarget(new Long(count), tsize);
            }
            result = new EvaluatedResult("BSF", count, tsize);
        }

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class BSR extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        //env.index++;

        this.GetParameterStatements(t, env);

        if (this.parameters.length != 2) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: BSR requires two parameters. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("BSR", 1, 1);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
        var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
        if (this.parameters[1].TargetIsPointer)
            source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);


        if (source.Value.equals(Long.UZERO)) {
            this.Program.Regs.RFlags.ZF = true;
            //target is undefined;
            result = new EvaluatedResult("BSR", 0, 1);
        }
        else {
            this.Program.Regs.RFlags.ZF = false;
            var count = (ssize * 8);

            if (ssize < 8) {
                var mask = 1 << (ssize * 8);
                var val = source.Value.getLowBits();
                
                while ((val & mask) != mask && count >= 0) {
                    count--;
                    mask >>= 1;
                }
                this.AssignValueToTarget(new Long(count), tsize);
            }
            else {
                var lmask = new Long(0xFFFFFFFF, 0xFFFFFFFF);
                while ((source.Value.and(lmask)).notEquals(lmask) && count >= 0) {
                    count--;
                    lmask = lmask.shiftRight(1);;
                }
                this.AssignValueToTarget(new Long(count), tsize);
                this.AssignValueToTarget(new Long(count), tsize);
            }
            result = new EvaluatedResult("BSR", count, tsize);
        }

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

///TODO: I don't think the nested Read Memory pointers from BP is correct. I *think* that should just be value in BP?
class ENTER extends Statement {
    
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);

        this.GetParameterStatements(t, env);

        if (this.parameters.length != 2) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: ENTER requires two parameters. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }

        if (!(this.parameters[0].Parameter instanceof NumberValue)) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: ENTER target parameter must be an immidiate value. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
        if (!(this.parameters[1].Parameter instanceof NumberValue)) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: ENTER source parameter must be an immidiate value. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("ENTER", 1, 1);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        var AllocSize = target.Value.getLowBits();
        var NestingLevel = source.Value.getLowBits() % 32;
        var FrameTemp: Long;
        if (this.Program.OperandSize == 64) {
            PUSH.Push(this.Program, 8, this.Program.Regs.BP.R); /* RSP decrements by 8 */
            FrameTemp = this.Program.Regs.SP.R;
        }
        else if (this.Program.OperandSize == 32) {
            PUSH.Push(this.Program, 4, this.Program.Regs.BP.E); /* (E)SP decrements by 4 */
            FrameTemp = this.Program.Regs.SP.E;
        }
        else { /* OperandSize = 16 */
            PUSH.Push(this.Program, 2, this.Program.Regs.BP.X); /* RSP or (E)SP decrements by 2 */
            FrameTemp = this.Program.Regs.SP.X;
        }
        if (NestingLevel > 1) {
            for (var i = 1; i < (NestingLevel - 1); i++) {
                if (this.Program.OperandSize == 64) {
                    this.Program.Regs.BP.R = this.Program.Regs.BP.R.subtract(Long.fromInt(8));
                    PUSH.Push(this.Program, 8, this.Program.Mem.ReadMemory8Bytes(this.Program.Regs.BP.R)); /* Quadword push */
                }
                else if (this.Program.OperandSize == 32) {
                    if (this.Program.StackSize == 32) {
                        this.Program.Regs.BP.E = this.Program.Regs.BP.E.subtract(Long.fromInt(4));
                        PUSH.Push(this.Program, 4, this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.BP.E)); /* Doubleword push */
                    }
                    else { /* StackSize == 16 */
                        this.Program.Regs.BP.X = this.Program.Regs.BP.X.subtract(Long.fromInt(4));
                        PUSH.Push(this.Program, 2, this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.BP.X)); /* Doubleword push */
                    }
                }
                else { /* OperandSize = 16 */
                    if (this.Program.StackSize == 32) {
                        this.Program.Regs.BP.E = this.Program.Regs.BP.E.subtract(Long.fromInt(2));
                        PUSH.Push(this.Program, 4, this.Program.Mem.ReadMemory4Bytes(this.Program.Regs.BP.E)); /* Word push */
                    }
                    else { /* StackSize = 16 */
                        this.Program.Regs.BP.X = this.Program.Regs.BP.X.subtract(Long.fromInt(2));
                        PUSH.Push(this.Program, 2, this.Program.Mem.ReadMemory2Bytes(this.Program.Regs.BP.X)); /* Word push */
                    }
                }
            }
            if (this.Program.OperandSize = 64) { /* nestinglevel 1 */
                PUSH.Push(this.Program, 8, FrameTemp); /* Quadword push and RSP decrements by 8 */
            }
            else if (this.Program.OperandSize = 32) {
                PUSH.Push(this.Program, 4, FrameTemp);
            } /* Doubleword push and (E)SP decrements by 4 */
            else { /* OperandSize = 16 */
                PUSH.Push(this.Program, 2, FrameTemp); /* Word push and RSP|ESP|SP decrements by 2 */
            }
        }
        if (this.Program.OperandSize == 64) { // Mode(StackSize == 64)
            this.Program.Regs.BP.R = FrameTemp;
            this.Program.Regs.SP.R = this.Program.Regs.SP.R.subtract(Long.fromInt(AllocSize));
        }
        else if (this.Program.OperandSize == 32) {
            this.Program.Regs.BP.E = FrameTemp;
            this.Program.Regs.SP.E = this.Program.Regs.SP.E.subtract(Long.fromInt( AllocSize));
        }
        else { /* OperandSize = 16 */
            this.Program.Regs.BP.X = FrameTemp.and(Long.UShortMask); /* Bits 16 and above of applicable RBP/EBP are unmodified */
            this.Program.Regs.SP.X = this.Program.Regs.SP.X.subtract(Long.fromInt( AllocSize));
        }

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }
}

class LEAVE extends Statement {
    
    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        this.GetParameterStatements(t, env);

        if (this.parameters.length != 0) {
            this.Program.failedToken = this.Token;
            throw new Error("Error: LEAVE does not have parameters. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        }
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("LEAVE", 1, 1);

        if (this.Program.StackSize == 64) {
            this.Program.Regs.SP.R = this.Program.Regs.BP.R;
        }
        else if (this.Program.StackSize == 32) {
            this.Program.Regs.SP.E = this.Program.Regs.BP.E;
        }
        else if (this.Program.StackSize == 16) {
            this.Program.Regs.SP.X = this.Program.Regs.BP.X;
        }
        if (this.Program.OperandSize == 64) {
            this.Program.Regs.BP.R = POP.Pop(this.Program, 8);
        }
        else if (this.Program.OperandSize == 32) {
            this.Program.Regs.BP.E = POP.Pop(this.Program, 4);
        }
        else if (this.Program.OperandSize == 16) {
            this.Program.Regs.BP.X = POP.Pop(this.Program, 2);
        }

        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}


class LAHF extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();
        //this.Program.Regs.RFlags.SetFlags(result.DataSize, result.Value);

        this.Program.Regs.A.H = this.Program.Regs.RFlags.SaveFlags().maskLowBitsAnd(0xFF);
        //AH ← EFLAGS(SF: ZF: 0: AF: 0: PF: 1: CF)

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}

class SAHF extends Statement {

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        env.index++;
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult();

        this.Program.Regs.RFlags.LoadFlags(this.Program.Regs.A.H, 1);

        this.Program.postInstructionCallback(this, result);
        return result;
    }

}



class CMPXCHG extends Statement {

    public size: number;

    constructor(preInstructionCallback: Function, postInstructionCallback: Function, t: Token[], env: Program = null, numofbytes: number = 0) {
        super(preInstructionCallback, postInstructionCallback, t[env.index - 1], env);
        //env.index++;
        this.size = numofbytes;

        this.GetParameterStatements(t, env);

        //if (this.parameters.length != 2) {
        //    this.Program.failedToken = this.Token;
        //    throw new Error("Error: BSR requires two parameters. near: " + this.Program.failedToken.Value + "\nLine: " + this.Program.GetErrorLine());
        //}
    }

    public Evaluate(): EvaluatedResult {
        this.Program.preInstructionCallback(this);
        var result = new EvaluatedResult("CMPXCHG", 1, 1);

        var target: EvaluatedResult = this.parameters[0].Evaluate();
        var source: EvaluatedResult = this.parameters[1].Evaluate();

        if (this.size != 0) {
            //CMPXCHG8B/CMPXCHG16B
            if (this.size == 8) {

            }

        }
        else {
            var tsize = Statement.Size(target.DataSize, this.parameters[0], source.DataSize, this.parameters[1]);
            var ssize = Statement.Size(source.DataSize, this.parameters[1], target.DataSize, this.parameters[0]);
            if (this.parameters[1].TargetIsPointer)
                source.Value = this.Program.Mem.ReadMemoryNumber(source.Value, ssize);

            /* Accumulator == AL, AX, EAX, or RAX depending on whether a byte, word, doubleword, or quadword comparison is being performed */
            var accumulator;
            switch (tsize) {
                case 1:
                    accumulator = this.Program.Regs.A.L;
                    break;
                case 2:
                    accumulator = this.Program.Regs.A.X;
                    break;
                case 4:
                    accumulator = this.Program.Regs.A.E;
                    break;
                case 8:
                    accumulator = this.Program.Regs.A.R;
                    break;
            }

            this.Program.Regs.RFlags.SetFlags(tsize, target.Value, accumulator);

            if (accumulator.equals(target.Value)) {
                this.Program.Regs.RFlags.ZF = true;
                this.AssignValueToTarget(source.Value, tsize);
            }
            else {
                this.Program.Regs.RFlags.ZF = false;

                switch (tsize) {
                    case 1:
                        this.Program.Regs.A.L = target.Value;
                        break;
                    case 2:
                        this.Program.Regs.A.X = target.Value;
                        break;
                    case 4:
                        this.Program.Regs.A.E = target.Value;
                        break;
                    case 8:
                        this.Program.Regs.A.R = target.Value;
                        break;
                }
                this.AssignValueToTarget(target.Value, tsize);
            }
        }
        
        this.Program.postInstructionCallback(this, result);
        return result;
    }

}
