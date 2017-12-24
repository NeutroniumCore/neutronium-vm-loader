
import { parser } from '../src/parseJSON'

const jsonString = '{    "index": 340, "specialString":"\\u2028",    "isActive": false,"isInactive": true,    "balance": 3405.78,    "picture": "http://placehold.it/32x32",    "age": 40,    "name": "Tillman Baxter",    "gender": null,    "registered": "2015-06-27T09:28:31 +03:00","number":19.23e-3,"number2":1.23e+5,"number3":1.1e1,    "latitude": -59.467591,    "longitude": -69.251054,    "tags": [      "fugiat"    ],    "friends": [      {        "name": "Vicky"      },      {        "name": "Keri"      },      {        "name": "Hampton"      }    ]  }';

describe('when parsing a JSON', () => {
    var object;

    beforeAll(() => {
        object = parser(jsonString);
    });

    test("it parses int", () => {
        expect(object.index).toBe(340);
    });

    test("it parses true", () => {
        expect(object.isActive).toBe(false);
    });

    test("it parses false", () => {
        expect(object.isInactive).toBe(true);
    });

    test("it parses gender", () => {
        expect(object.gender).toBeNull();
    });

    test("it parses string", () => {
        expect(object.picture).toBe('http://placehold.it/32x32');
    });

    test("it parses number, exp negative", () => {
        expect(object.number).toBe(19.23e-3);
    });

    test("it parses number, exp positive", () => {
        expect(object.number2).toBe(1.23e+5);
    });

    test("it parses number, exp implicite", () => {
        expect(object.number3).toBe(1.1e+1);
    });

    test("it parses special string", () => {
        expect(typeof object.specialString).toBe('string');
    });
});

test("parser throw on invalid object", () => {
    const parse = () => parser('{}0');
    expect(parse).toThrow('Syntax error');
});

test("parser throw on Duplicate key", () => {
    const parse = () => parser('{"key":0, "key":43}');
    expect(parse).toThrow('Duplicate key "key"');
});

test("parser throw on unexpected", () => {
    const parse = () => parser('{"key":unexpected}');
    expect(parse).toThrow("Unexpected 'u'");
});