// Keyboard handler
export function getKeyNumber(e: KeyboardEvent): number {
	switch (e.key) {
		// 0
		case '0':
			return 9;
		// 1
		case '1':
			return 0;
		// 2
		case '2':
			return 1;
		// 3
		case '3':
			return 2;
		// 4
		case '4':
			return 3;
		// 5
		case '5':
			return 4;
		// 6
		case '6':
			return 5;
		// 7
		case '7':
			return 6;
		// 8
		case '8':
			return 7;
		// 9
		case '9':
			return 8;
		// A
		case 'A':
			return 10;
		// B
		case 'B':
			return 11;
		// C
		case 'C':
			return 12;
		// D
		case 'D':
			return 13;
		// E
		case 'E':
			return 14;
		// F
		case 'F':
			return 15;
		// escape
		case 'escape':
			return 27;
	}
	return 0;
}
