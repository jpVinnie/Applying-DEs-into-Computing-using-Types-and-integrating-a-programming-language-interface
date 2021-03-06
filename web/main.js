(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.__esModule = true;
exports.__ops = exports.__set_zoom = exports.__set_size = exports.__num_diff = exports.__eval = exports.__show_expr = exports.__csc = exports.__sec = exports.__cot = exports.__tan = exports.__cos = exports.__sin = exports.__e = exports.__tau = exports.__pi = exports.__enum = exports.__srange = exports.__range = exports.__times = exports.__reduce = exports.__filter = exports.__map = exports.__len = exports.__call = exports.__false = exports.__true = exports.__print = void 0;
var utils = require("./utils");
var expr = require("./expr");
function __print(st, out) {
    out.push(st.pop());
}
exports.__print = __print;
function __true(st) {
    st.push(true);
}
exports.__true = __true;
function __false(st) {
    st.push(false);
}
exports.__false = __false;
function __call(st, out) {
    st.pop()(st, out);
}
exports.__call = __call;
function __len(st) {
    st.push(st.pop().length);
}
exports.__len = __len;
function __map(st, out) {
    var fun = st.pop();
    var list = st.pop();
    st.push(list.map(function (obj) {
        st.push(obj);
        fun(st, out);
        return st.pop();
    }));
}
exports.__map = __map;
function __filter(st, out) {
    var fun = st.pop();
    var list = st.pop();
    st.push(list.filter(function (obj) {
        st.push(obj);
        fun(st, out);
        return st.pop();
    }));
}
exports.__filter = __filter;
function __reduce(st, out) {
    var fun = st.pop();
    var init_acc = st.pop();
    var list = st.pop();
    st.push(list.reduce(function (acc, curr) {
        st.push(curr);
        st.push(acc);
        fun(st, out);
        return st.pop();
    }, init_acc));
}
exports.__reduce = __reduce;
function __times(st) {
    var times = st.pop();
    st.push((new Array(times)).fill(0));
}
exports.__times = __times;
function __range(st) {
    var start = st.pop();
    var stop = st.pop();
    if (start <= stop) {
        st.push(Array.from(new Array(stop - start), function (_, i) { return i + start; }));
    }
    else {
        st.push(Array.from(new Array(start - stop), function (_, i) { return start - i; }));
    }
}
exports.__range = __range;
function __srange(st) {
    var start = st.pop();
    var stop = st.pop();
    var step = st.pop();
    st.push(Array.from(new Array(Math.ceil(Math.abs((stop - start) / step))), function (_, i) { return i * step + start; }));
}
exports.__srange = __srange;
function __enum(st) {
    st.push(st.pop().length);
    st.push(0);
    __range(st);
}
exports.__enum = __enum;
function __pi(st) {
    st.push(Math.PI);
}
exports.__pi = __pi;
function __tau(st) {
    st.push(2 * Math.PI);
}
exports.__tau = __tau;
function __e(st) {
    st.push(Math.E);
}
exports.__e = __e;
function __sin(st) {
    st.push(Math.sin(st.pop()));
}
exports.__sin = __sin;
function __cos(st) {
    st.push(Math.cos(st.pop()));
}
exports.__cos = __cos;
function __tan(st) {
    st.push(Math.tan(st.pop()));
}
exports.__tan = __tan;
function __cot(st) {
    st.push(1 / Math.tan(st.pop()));
}
exports.__cot = __cot;
function __sec(st) {
    st.push(1 / Math.cos(st.pop()));
}
exports.__sec = __sec;
function __csc(st) {
    st.push(1 / Math.sin(st.pop()));
}
exports.__csc = __csc;
function __show_expr(st) {
    st.push("{" + expr.stringify(st.pop()) + "}");
}
exports.__show_expr = __show_expr;
function __eval(st) {
    var ast = st.pop();
    var x = st.pop();
    st.push(expr.eval_at(ast, x));
}
exports.__eval = __eval;
function __num_diff(st) {
    var ast = st.pop();
    var x = st.pop();
    var h = 1e-10;
    // Ratio of difference
    st.push((expr.eval_at(ast, x + h) - expr.eval_at(ast, x)) / h);
}
exports.__num_diff = __num_diff;
function __set_size(st) {
    window.graph_w = st.pop();
    window.graph_h = st.pop();
}
exports.__set_size = __set_size;
function __set_zoom(st) {
    window.graph_zoom = st.pop();
}
exports.__set_zoom = __set_zoom;
function eq(a, b) {
    var a_type = utils.to_type(a);
    var b_type = utils.to_type(b);
    if (a_type != b_type)
        return false;
    else if (["number", "string", "boolean"].includes(a_type))
        return a == b;
    else if (a_type == "array")
        if (a.length != b.length)
            return false;
        else
            return a.every(function (obj, i) { return eq(obj, b[i]); });
    else
        return false;
}
var __ops = {
    // Comparison
    "==": function (st) {
        st.push(eq(st.pop(), st.pop()));
    },
    "!=": function (st) {
        st.push(!eq(st.pop(), st.pop()));
    },
    "<=": function (st) {
        st.push(st.pop() <= st.pop());
    },
    ">=": function (st) {
        st.push(st.pop() >= st.pop());
    },
    "<": function (st) {
        st.push(st.pop() < st.pop());
    },
    ">": function (st) {
        st.push(st.pop() > st.pop());
    },
    // Arithmetic
    "+": function (st) {
        st.push(st.pop() + st.pop());
    },
    "~": function (st) {
        st.push(-st.pop());
    },
    "-": function (st) {
        st.push(st.pop() - st.pop());
    },
    "*": function (st) {
        st.push(st.pop() * st.pop());
    },
    "/": function (st) {
        st.push(st.pop() / st.pop());
    },
    // Extra math
    "^": function (st) {
        st.push(Math.pow(st.pop(), st.pop()));
    },
    "%%": function (st) {
        st.push(st.pop() % st.pop() == 0);
    },
    "%": function (st) {
        st.push(st.pop() % st.pop());
    },
    // Calculus
    "'": function (st) {
        var derivative = expr.derive(st.pop());
        console.log(expr.stringify(derivative));
        var simplification = expr.simplify(derivative);
        console.log(expr.stringify(simplification));
        st.push(simplification);
    },
    // List/dictionary indexing
    "@=": function (st) {
        var _a = [st.pop(), st.pop(), st.pop()], list = _a[0], idx = _a[1], val = _a[2];
        list[idx] = val;
    },
    "@": function (st) {
        var _a = [st.pop(), st.pop()], list = _a[0], idx = _a[1];
        st.push(list[idx]);
    },
    // Boolean
    "&": function (st) {
        st.push(st.pop() && st.pop());
    },
    "|": function (st) {
        st.push(st.pop() || st.pop());
    },
    "!": function (st) {
        st.push(!(st.pop()));
    },
    // Special interaction
    "?": function (st) {
        st.push(window.res_hist[window.res_hist.length - 1]);
    },
    "??": function (st) {
        st.push(window.res_hist[st.pop()]);
    }
};
exports.__ops = __ops;

},{"./expr":3,"./utils":7}],2:[function(require,module,exports){
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.compile = void 0;
var types = require("./types");
var prelude = "with(main.builtins) {\n\nlet st = [];\nlet out = [];\n";
var postlude = "\n\nout = [...out, ...st];\nout;\n}";
var builtins = [
    "print", "true", "false", "call", "len", "map", "filter", "reduce", "times", "range", "srange", "enum",
    "pi", "tau", "e",
    "sin", "cos", "tan", "cot", "sec", "csc",
    "show_expr", "eval", "num_diff", "set_size", "set_zoom"
];
function compile(ast) {
    return prelude + compile_rec(ast, 0, [], [], []) + postlude;
}
exports.compile = compile;
function compile_rec(ast, indent, locals, vars, funs) {
    var compiled = ast.map(function (instrs) { return instrs.map(function (instr) {
        switch (instr.type) {
            case types.Instr_Type.op:
                return "__ops[\"" + types.Op[instr.data] + "\"](st, out);";
            case types.Instr_Type.name:
                if (instr.data == "debug")
                    return "debugger;";
                if (locals.includes(instr.data))
                    return "st.push(" + instr.data + ");";
                else if (vars.includes(instr.data) || instr.data in window.vars)
                    return "st.push(window.vars." + instr.data + ");";
                else if (funs.includes(instr.data) || instr.data in window.funs)
                    return "window.funs." + instr.data + "(st, out);";
                else if (builtins.includes(instr.data))
                    return "__" + instr.data + "(st, out);";
                else
                    throw instr.data + " is not a variable or function.";
            case types.Instr_Type.ref:
                if (locals.includes(instr.data))
                    return "st.push(" + instr.data + ");";
                else if (vars.includes(instr.data) || instr.data in window.vars)
                    return "st.push(window.vars." + instr.data + ");";
                else if (funs.includes(instr.data) || instr.data in window.funs)
                    return "st.push(window.funs." + instr.data + ");";
                else if (builtins.includes(instr.data))
                    return "st.push(__" + instr.data + ");";
                else
                    throw instr.data + " is not a variable or function.";
            case types.Instr_Type.ls:
                return "st.push((() => {\n" + tabs(indent + 1) + "let st = [];\n" + compile_rec([instr.items], indent + 1, locals, vars, funs) + "\n" + tabs(indent + 1) + "return st.reverse();\n" + tabs(indent) + "})())";
            case types.Instr_Type.obj:
                return "st.push({\n" + instr.pairs.map(function (_a) {
                    var key = _a.key, value = _a.value;
                    return "" + tabs(indent + 1) + key + ": (() => {\n" + compile_rec([value], indent + 2, locals, vars, funs) + "\n" + tabs(indent + 2) + "return st.pop();\n" + tabs(indent + 1) + "})()";
                }).join(",\n") + "\n" + tabs(indent) + "});";
            case types.Instr_Type.prop:
                return "st.push(st.pop()." + instr.data + ");";
            case types.Instr_Type.num:
                return "st.push(" + instr.data + ");";
            case types.Instr_Type.str:
                return "st.push(\"" + instr.data + "\");";
            case types.Instr_Type.expr:
                return "st.push(new main.Expr(" + JSON.stringify(instr.data) + "))";
            case types.Instr_Type["if"]:
                return instr.branches.map(function (branch) {
                    return (branch.cond
                        ? "if((() => {\n" + compile_rec([branch.cond], indent + 2, locals, vars, funs) + "\n" + tabs(indent + 2) + "return st.pop();\n" + tabs(indent + 1) + "})()) "
                        : "") + "{\n" + compile_rec(branch.body, indent + 1, locals, vars, funs) + "\n" + tabs(indent) + "}";
                }).join(" else ");
            case types.Instr_Type["for"]:
                return "for(const " + instr["var"] + " of (() => {\n" + compile_rec([instr.iter], indent + 2, locals, vars, funs) + "\n" + tabs(indent + 2) + "return st.pop();\n" + tabs(indent + 1) + "})()) {\n" + compile_rec(instr.body, indent + 1, __spreadArrays(locals, [instr["var"]]), vars, funs) + "\n" + tabs(indent) + "}";
            case types.Instr_Type["while"]:
                return "while((() => {\n" + compile_rec([instr.cond], indent + 2, locals, vars, funs) + "\n" + tabs(indent + 2) + "return st.pop();\n" + tabs(indent + 1) + "})()) {\n" + compile_rec(instr.body, indent + 1, locals, vars, funs) + "\n" + tabs(indent) + "}";
            // Add deriv.
            case types.Instr_Type.local:
                if (!locals.includes(instr["var"]))
                    locals = __spreadArrays(locals, [instr["var"]]);
                return "let " + instr["var"] + " = (() => {\n" + compile_rec([instr.def], indent + 1, locals, vars, funs) + "\n" + tabs(indent + 1) + "return st.pop();\n" + tabs(indent) + "})();";
            case types.Instr_Type["var"]:
                if (locals.includes(instr["var"]))
                    return instr["var"] + " = (() => {\n" + compile_rec([instr.def], indent + 1, locals, vars, funs) + "\n" + tabs(indent + 1) + "return st.pop();\n" + tabs(indent) + "})();";
                else {
                    if (!vars.includes(instr["var"]))
                        vars = __spreadArrays(vars, [instr["var"]]);
                    return "window.vars." + instr["var"] + " = (() => {\n" + compile_rec([instr.def], indent + 1, locals, vars, funs) + "\n" + tabs(indent + 1) + "return st.pop();\n" + tabs(indent) + "})();";
                }
            case types.Instr_Type.fun:
                funs = __spreadArrays(funs, [instr.fun]);
                return "window.funs." + instr.fun + " = (st, out) => {\n" + instr.args.map(function (arg) { return tabs(indent + 1) + "let " + arg + " = st.pop();\n"; }).join("") + compile_rec(instr.body, indent + 1, __spreadArrays(locals, instr.args), vars, funs) + "\n" + tabs(indent) + "}";
            case types.Instr_Type.anon:
                return "st.push((st, out) => {\n" + instr.args.map(function (arg) { return tabs(indent + 1) + "let " + arg + " = st.pop();\n"; }).join("") + compile_rec(instr.body, indent + 1, __spreadArrays(locals, instr.args), vars, funs) + "\n" + tabs(indent) + "});";
            default:
                return "NOT OP;";
        }
    }); });
    return compiled.map(function (comp_instrs) {
        return comp_instrs.map(function (instr) {
            return tabs(indent) + instr;
        }).join("\n");
    }).join("\n");
}
function tabs(indent) {
    return "\t".repeat(indent);
}

},{"./types":6}],3:[function(require,module,exports){
exports.__esModule = true;
exports.stringify = exports.simplify = exports.derive = exports.eval_at = exports.Expr = void 0;
var types = require("./types");
var Expr = /** @class */ (function () {
    function Expr(ast) {
        for (var key in ast) {
            this[key] = ast[key];
        }
    }
    return Expr;
}());
exports.Expr = Expr;
function num(n) {
    return wrap_expr({ type: types.Expr_Type.num, data: n });
}
function eval_at(ast, x) {
    switch (ast.type) {
        case types.Expr_Type.add:
            return eval_at(ast.left, x) + eval_at(ast.right, x);
        case types.Expr_Type.sub:
            return eval_at(ast.left, x) - eval_at(ast.right, x);
        case types.Expr_Type.mul:
            return eval_at(ast.left, x) * eval_at(ast.right, x);
        case types.Expr_Type.div:
            return eval_at(ast.left, x) / eval_at(ast.right, x);
        case types.Expr_Type.pow:
            return Math.pow(eval_at(ast.left, x), eval_at(ast.right, x));
        case types.Expr_Type.call:
            switch (ast.name) {
                // 1 argument
                case "abs": return Math.abs(eval_at(ast.args[0], x));
                case "sqrt": return Math.sqrt(eval_at(ast.args[0], x));
                case "cbrt": return Math.cbrt(eval_at(ast.args[0], x));
                case "ln": return Math.log(eval_at(ast.args[0], x));
                case "sin": return Math.sin(eval_at(ast.args[0], x));
                case "cos": return Math.cos(eval_at(ast.args[0], x));
                case "tan": return Math.tan(eval_at(ast.args[0], x));
                case "cot": return 1 / Math.tan(eval_at(ast.args[0], x));
                case "sec": return 1 / Math.cos(eval_at(ast.args[0], x));
                case "csc": return 1 / Math.sin(eval_at(ast.args[0], x));
                // 2 arguments
                case "root": return Math.pow(eval_at(ast.args[1], x), 1 / eval_at(ast.args[0], x));
                case "log": return (Math.log(eval_at(ast.args[1], x)) /
                    Math.log(eval_at(ast.args[0], x)));
            }
        case types.Expr_Type.expr_var:
            return x;
        case types.Expr_Type.num:
            return ast.data;
    }
}
exports.eval_at = eval_at;
function derive(ast) {
    switch (ast.type) {
        case types.Expr_Type.add:
            return wrap_expr({
                type: types.Expr_Type.add,
                left: derive(ast.left),
                right: derive(ast.right)
            });
        case types.Expr_Type.sub:
            return wrap_expr({
                type: types.Expr_Type.sub,
                left: derive(ast.left),
                right: derive(ast.right)
            });
        case types.Expr_Type.mul:
            return wrap_expr({
                type: types.Expr_Type.add,
                left: {
                    type: types.Expr_Type.mul,
                    left: derive(ast.left),
                    right: ast.right
                },
                right: {
                    type: types.Expr_Type.mul,
                    left: ast.left,
                    right: derive(ast.right)
                }
            });
        case types.Expr_Type.div:
            return wrap_expr({
                type: types.Expr_Type.div,
                left: {
                    type: types.Expr_Type.sub,
                    left: {
                        type: types.Expr_Type.mul,
                        left: derive(ast.left),
                        right: ast.right
                    },
                    right: {
                        type: types.Expr_Type.mul,
                        left: ast.left,
                        right: derive(ast.right)
                    }
                },
                right: {
                    type: types.Expr_Type.pow,
                    left: ast.right,
                    right: num(2)
                }
            });
        // Exponentiation will only work for numerical exponents 
        // This has chain rule but it can be abstracted better later
        case types.Expr_Type.pow:
            return wrap_expr({
                type: types.Expr_Type.mul,
                left: {
                    type: types.Expr_Type.mul,
                    left: {
                        type: types.Expr_Type.pow,
                        left: ast.left,
                        right: {
                            type: types.Expr_Type.sub,
                            left: ast.right,
                            right: num(1)
                        }
                    },
                    right: ast.right
                },
                right: derive(ast.left)
            });
        case types.Expr_Type.expr_var:
            return num(1);
        case types.Expr_Type.num:
            return num(0);
    }
}
exports.derive = derive;
function simplify(ast) {
    var left;
    var right;
    switch (ast.type) {
        case types.Expr_Type.add:
            left = simplify(ast.left);
            right = simplify(ast.right);
            if (left.type == types.Expr_Type.num &&
                right.type == types.Expr_Type.num) {
                return num(left.data + right.data);
            }
            else if (left.type == types.Expr_Type.num &&
                left.data == 0) {
                return right;
            }
            else if (right.type == types.Expr_Type.num &&
                right.data == 0) {
                return left;
            }
            return wrap_expr({
                type: types.Expr_Type.add,
                left: left, right: right
            });
        case types.Expr_Type.sub:
            left = simplify(ast.left);
            right = simplify(ast.right);
            if (left.type == types.Expr_Type.num &&
                right.type == types.Expr_Type.num) {
                return num(left.data - right.data);
            }
            else if (right.type == types.Expr_Type.num &&
                right.data == 0) {
                return left;
            }
            return wrap_expr({
                type: types.Expr_Type.sub,
                left: left, right: right
            });
        case types.Expr_Type.mul:
            left = simplify(ast.left);
            right = simplify(ast.right);
            if (left.type == types.Expr_Type.num &&
                right.type == types.Expr_Type.num) {
                return num(left.data * right.data);
            }
            else if (left.type == types.Expr_Type.num &&
                left.data == 1) {
                return right;
            }
            else if (right.type == types.Expr_Type.num &&
                right.data == 1) {
                return left;
            }
            else if (left.type == types.Expr_Type.num &&
                left.data == 0) {
                return num(0);
            }
            else if (right.type == types.Expr_Type.num &&
                right.data == 0) {
                return num(0);
            }
            return wrap_expr({
                type: types.Expr_Type.mul,
                left: left, right: right
            });
        case types.Expr_Type.div:
            left = simplify(ast.left);
            right = simplify(ast.right);
            if (left.type == types.Expr_Type.num &&
                right.type == types.Expr_Type.num) {
                return num(left.data / right.data);
            }
            else if (right.type == types.Expr_Type.num &&
                right.data == 1) {
                return left;
            }
            return wrap_expr({
                type: types.Expr_Type.div,
                left: left, right: right
            });
        case types.Expr_Type.pow:
            left = simplify(ast.left);
            right = simplify(ast.right);
            if (left.type == types.Expr_Type.num &&
                right.type == types.Expr_Type.num) {
                return num(Math.pow(left.data, right.data));
            }
            else if (right.type == types.Expr_Type.num &&
                right.data == 1) {
                return left;
            }
            return wrap_expr({
                type: types.Expr_Type.pow,
                left: left, right: right
            });
        case types.Expr_Type.call:
            return wrap_expr({
                type: types.Expr_Type.call,
                name: ast.name,
                args: ast.args.map(simplify)
            });
        case types.Expr_Type.expr_var:
        case types.Expr_Type.num:
            return wrap_expr(ast);
    }
}
exports.simplify = simplify;
function stringify(ast) {
    switch (ast.type) {
        case types.Expr_Type.add:
            return "(" + stringify(ast.left) + " + " + stringify(ast.right) + ")";
        case types.Expr_Type.sub:
            return "(" + stringify(ast.left) + " - " + stringify(ast.right) + ")";
        case types.Expr_Type.mul:
            return "(" + stringify(ast.left) + " * " + stringify(ast.right) + ")";
        case types.Expr_Type.div:
            return "(" + stringify(ast.left) + " / " + stringify(ast.right) + ")";
        case types.Expr_Type.pow:
            return "(" + stringify(ast.left) + " ^ " + stringify(ast.right) + ")";
        case types.Expr_Type.call:
            return ast.name + "(" + ast.args.map(stringify).join(", ") + ")";
        case types.Expr_Type.expr_var:
            return "x";
        case types.Expr_Type.num:
            return ast.data.toString();
    }
}
exports.stringify = stringify;
function wrap_expr(ast) {
    return new Expr(ast);
}

},{"./types":6}],4:[function(require,module,exports){
exports.__esModule = true;
exports.Expr_Type = exports.stringify_expr = exports.eval_at = exports.Expr = exports.to_type = exports.builtins = exports.err_to_str = exports.run = void 0;
var parser = require("./parser");
var compiler = require("./compiler");
var builtins = require("./builtins");
exports.builtins = builtins;
var utils = require("./utils");
var expr = require("./expr");
var types = require("./types");
function run(prog) {
    var comp = compiler.compile(parser.parse(prog));
    console.log(comp);
    return eval(comp);
}
exports.run = run;
var err_to_str = function (err) { return !(err instanceof Error)
    ? err
    : err.stack.split("\n").slice(0, 2).join("\n\t"); };
exports.err_to_str = err_to_str;
var to_type = utils.to_type;
exports.to_type = to_type;
var Expr = expr.Expr;
exports.Expr = Expr;
var eval_at = expr.eval_at;
exports.eval_at = eval_at;
var stringify_expr = expr.stringify;
exports.stringify_expr = stringify_expr;
var Expr_Type = {};
exports.Expr_Type = Expr_Type;
Object.assign(Expr_Type, types.Expr_Type);

},{"./builtins":1,"./compiler":2,"./expr":3,"./parser":5,"./types":6,"./utils":7}],5:[function(require,module,exports){
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var types = require("./types");
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
"use strict";
function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
}
function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
    }
}
peg$subclass(peg$SyntaxError, Error);
peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
        literal: function (expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
        },
        "class": function (expectation) {
            var escapedParts = "", i;
            for (i = 0; i < expectation.parts.length; i++) {
                escapedParts += expectation.parts[i] instanceof Array
                    ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                    : classEscape(expectation.parts[i]);
            }
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function (expectation) {
            return "any character";
        },
        end: function (expectation) {
            return "end of input";
        },
        other: function (expectation) {
            return expectation.description;
        }
    };
    function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
        return s
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
    }
    function classEscape(s) {
        return s
            .replace(/\\/g, '\\\\')
            .replace(/\]/g, '\\]')
            .replace(/\^/g, '\\^')
            .replace(/-/g, '\\-')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
    }
    function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected) {
        var descriptions = new Array(expected.length), i, j;
        for (i = 0; i < expected.length; i++) {
            descriptions[i] = describeExpectation(expected[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
                if (descriptions[i - 1] !== descriptions[i]) {
                    descriptions[j] = descriptions[i];
                    j++;
                }
            }
            descriptions.length = j;
        }
        switch (descriptions.length) {
            case 1:
                return descriptions[0];
            case 2:
                return descriptions[0] + " or " + descriptions[1];
            default:
                return descriptions.slice(0, -1).join(", ")
                    + ", or "
                    + descriptions[descriptions.length - 1];
        }
    }
    function describeFound(found) {
        return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {}, peg$startRuleFunctions = { Block: peg$parseBlock }, peg$startRuleFunction = peg$parseBlock, peg$c0 = ";", peg$c1 = peg$literalExpectation(";", false), peg$c2 = function (instr_chunks) { return __spreadArrays([instr_chunks[0]], instr_chunks[2].map(function (instr) { return instr[2]; })); }, peg$c3 = function (instrs) { return instrs.map(function (instr) { return instr[0]; }).reverse(); }, peg$c4 = "if", peg$c5 = peg$literalExpectation("if", false), peg$c6 = ":", peg$c7 = peg$literalExpectation(":", false), peg$c8 = "elif", peg$c9 = peg$literalExpectation("elif", false), peg$c10 = "else", peg$c11 = peg$literalExpectation("else", false), peg$c12 = "end", peg$c13 = peg$literalExpectation("end", false), peg$c14 = function (cond, if_branch, elif_branches, else_branch) {
        return { type: types.Instr_Type["if"], branches: __spreadArrays([
                { cond: cond, body: if_branch }
            ], elif_branches.map(function (branch) { return ({ cond: branch[2], body: branch[6] }); }), (else_branch ? [{ cond: null, body: else_branch[2] }] : [])) };
    }, peg$c15 = "for", peg$c16 = peg$literalExpectation("for", false), peg$c17 = function (var_, iter, body) { return { type: types.Instr_Type["for"], "var": var_.data, iter: iter, body: body }; }, peg$c18 = "while", peg$c19 = peg$literalExpectation("while", false), peg$c20 = function (cond, body) { return { type: types.Instr_Type["while"], cond: cond, body: body }; }, peg$c21 = "'", peg$c22 = peg$literalExpectation("'", false), peg$c23 = ":=", peg$c24 = peg$literalExpectation(":=", false), peg$c25 = function (var_, deriv, def) { return { type: types.Instr_Type.local, "var": var_.data, def: def, deriv_n: deriv.length }; }, peg$c26 = "=", peg$c27 = peg$literalExpectation("=", false), peg$c28 = function (var_, deriv, def) { return { type: types.Instr_Type["var"], "var": var_.data, def: def, deriv_n: deriv.length }; }, peg$c29 = "fun", peg$c30 = peg$literalExpectation("fun", false), peg$c31 = function (fun, args, body) { return { type: types.Instr_Type.fun, fun: fun.data, args: args.map(function (arg) { return arg[0].data; }), body: body }; }, peg$c32 = "anon", peg$c33 = peg$literalExpectation("anon", false), peg$c34 = function (args, body) { return { type: types.Instr_Type.anon, args: args.map(function (arg) { return arg[0].data; }), body: body }; }, peg$c35 = "==", peg$c36 = peg$literalExpectation("==", false), peg$c37 = "!=", peg$c38 = peg$literalExpectation("!=", false), peg$c39 = "<=", peg$c40 = peg$literalExpectation("<=", false), peg$c41 = ">=", peg$c42 = peg$literalExpectation(">=", false), peg$c43 = "<", peg$c44 = peg$literalExpectation("<", false), peg$c45 = ">", peg$c46 = peg$literalExpectation(">", false), peg$c47 = "+", peg$c48 = peg$literalExpectation("+", false), peg$c49 = "~", peg$c50 = peg$literalExpectation("~", false), peg$c51 = "-", peg$c52 = peg$literalExpectation("-", false), peg$c53 = "*", peg$c54 = peg$literalExpectation("*", false), peg$c55 = "/", peg$c56 = peg$literalExpectation("/", false), peg$c57 = "^", peg$c58 = peg$literalExpectation("^", false), peg$c59 = "%%", peg$c60 = peg$literalExpectation("%%", false), peg$c61 = "%", peg$c62 = peg$literalExpectation("%", false), peg$c63 = "@=", peg$c64 = peg$literalExpectation("@=", false), peg$c65 = "@", peg$c66 = peg$literalExpectation("@", false), peg$c67 = "&", peg$c68 = peg$literalExpectation("&", false), peg$c69 = "|", peg$c70 = peg$literalExpectation("|", false), peg$c71 = "!", peg$c72 = peg$literalExpectation("!", false), peg$c73 = "??", peg$c74 = peg$literalExpectation("??", false), peg$c75 = "?", peg$c76 = peg$literalExpectation("?", false), peg$c77 = function () { return { type: types.Instr_Type.op, data: types.Op[text()] }; }, peg$c78 = "var", peg$c79 = peg$literalExpectation("var", false), peg$c80 = /^[A-Za-z_]/, peg$c81 = peg$classExpectation([["A", "Z"], ["a", "z"], "_"], false, false), peg$c82 = /^[A-Za-z0-9_]/, peg$c83 = peg$classExpectation([["A", "Z"], ["a", "z"], ["0", "9"], "_"], false, false), peg$c84 = function () { return { type: types.Instr_Type.name, data: text() }; }, peg$c85 = "`", peg$c86 = peg$literalExpectation("`", false), peg$c87 = function (ref) { return { type: types.Instr_Type.ref, data: ref.data }; }, peg$c88 = "[", peg$c89 = peg$literalExpectation("[", false), peg$c90 = "]", peg$c91 = peg$literalExpectation("]", false), peg$c92 = function (instrs) { return { type: types.Instr_Type.ls, items: instrs }; }, peg$c93 = "#[", peg$c94 = peg$literalExpectation("#[", false), peg$c95 = function (pairs) {
        return {
            type: types.Instr_Type.obj,
            pairs: pairs.map(function (pair) { return { key: pair[1].data, value: pair[2] }; })
        };
    }, peg$c96 = ".", peg$c97 = peg$literalExpectation(".", false), peg$c98 = function (prop) { return { type: types.Instr_Type.prop, data: prop.data }; }, peg$c99 = /^[0-9]/, peg$c100 = peg$classExpectation([["0", "9"]], false, false), peg$c101 = function () { return { type: types.Instr_Type.num, data: parseFloat(text()) }; }, peg$c102 = "\"", peg$c103 = peg$literalExpectation("\"", false), peg$c104 = /^[^"\\]/, peg$c105 = peg$classExpectation(["\"", "\\"], true, false), peg$c106 = "\\", peg$c107 = peg$literalExpectation("\\", false), peg$c108 = peg$anyExpectation(), peg$c109 = function () {
        return {
            type: types.Instr_Type.str,
            data: text().slice(1, -1) // .replace(/\\n/g, "\n").replace(/\\(.)/g, "$1")
        };
    }, peg$c110 = function () {
        return {
            type: types.Instr_Type.str,
            data: text().slice(1).replace(/\\/g, "\\\\").replace(/"/g, '\\"')
        };
    }, peg$c111 = /^[ \t\n\r]/, peg$c112 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false), peg$c113 = "#(", peg$c114 = peg$literalExpectation("#(", false), peg$c115 = /^[^)]/, peg$c116 = peg$classExpectation([")"], true, false), peg$c117 = ")", peg$c118 = peg$literalExpectation(")", false), peg$c119 = "{", peg$c120 = peg$literalExpectation("{", false), peg$c121 = "}", peg$c122 = peg$literalExpectation("}", false), peg$c123 = function (terms) { return { type: types.Instr_Type.expr, data: terms }; }, peg$c124 = /^[+\-]/, peg$c125 = peg$classExpectation(["+", "-"], false, false), peg$c126 = function (prod, prods) {
        return (!prods
            ? prod
            : {
                type: prods[1] == "+" ? types.Expr_Type.add : types.Expr_Type.sub,
                left: prod,
                right: prods[3]
            });
    }, peg$c127 = /^[*\/]/, peg$c128 = peg$classExpectation(["*", "/"], false, false), peg$c129 = function (exp, exps) {
        return (!exps
            ? exp
            : {
                type: exps[1] == "/" ? types.Expr_Type.div : types.Expr_Type.mul,
                left: exp,
                right: exps[3]
            });
    }, peg$c130 = function (final, finals) {
        return (!finals
            ? final
            : {
                type: types.Expr_Type.pow,
                left: final,
                right: finals[3]
            });
    }, peg$c131 = function (pos, val) {
        return (!pos
            ? val
            : {
                type: types.Expr_Type.sub,
                left: { type: types.Expr_Type.num, data: 0 },
                right: val
            });
    }, peg$c132 = "(", peg$c133 = peg$literalExpectation("(", false), peg$c134 = function (data) { return data; }, peg$c135 = function (name, arg) { return { type: types.Expr_Type.call, name: name, args: [arg] }; }, peg$c136 = ",", peg$c137 = peg$literalExpectation(",", false), peg$c138 = function (name, arg1, arg2) { return { type: types.Expr_Type.call, name: name, args: [arg1, arg2] }; }, peg$c139 = "abs", peg$c140 = peg$literalExpectation("abs", false), peg$c141 = "sqrt", peg$c142 = peg$literalExpectation("sqrt", false), peg$c143 = "cbrt", peg$c144 = peg$literalExpectation("cbrt", false), peg$c145 = "ln", peg$c146 = peg$literalExpectation("ln", false), peg$c147 = "sin", peg$c148 = peg$literalExpectation("sin", false), peg$c149 = "cos", peg$c150 = peg$literalExpectation("cos", false), peg$c151 = "tan", peg$c152 = peg$literalExpectation("tan", false), peg$c153 = "cot", peg$c154 = peg$literalExpectation("cot", false), peg$c155 = "sec", peg$c156 = peg$literalExpectation("sec", false), peg$c157 = "csc", peg$c158 = peg$literalExpectation("csc", false), peg$c159 = "root", peg$c160 = peg$literalExpectation("root", false), peg$c161 = "log", peg$c162 = peg$literalExpectation("log", false), peg$c163 = "pi", peg$c164 = peg$literalExpectation("pi", false), peg$c165 = "\u03C0", peg$c166 = peg$literalExpectation("\u03C0", false), peg$c167 = "tau", peg$c168 = peg$literalExpectation("tau", false), peg$c169 = "\u03C4", peg$c170 = peg$literalExpectation("\u03C4", false), peg$c171 = "e", peg$c172 = peg$literalExpectation("e", false), peg$c173 = function () {
        return { type: types.Expr_Type.num, data: {
                pi: Math.PI, π: Math.PI,
                tau: 2 * Math.PI, τ: 2 * Math.PI,
                e: Math.E
            }[text()] };
    }, peg$c174 = "x", peg$c175 = peg$literalExpectation("x", false), peg$c176 = function () { return { type: types.Expr_Type.expr_var }; }, peg$c177 = function () { return { type: types.Expr_Type.num, data: parseFloat(text()) }; }, peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
    if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
    }
    function error(message, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location);
    }
    function peg$literalExpectation(text, ignoreCase) {
        return { type: "literal", text: text, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected);
    }
    function peg$buildSimpleError(message, location) {
        return new peg$SyntaxError(message, null, null, location);
    }
    function peg$buildStructuredError(expected, found, location) {
        return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parseBlock() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseInstrs();
            if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 59) {
                        s7 = peg$c0;
                        peg$currPos++;
                    }
                    else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c1);
                        }
                    }
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parse_();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parseInstrs();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parse_();
                                if (s10 !== peg$FAILED) {
                                    s7 = [s7, s8, s9, s10];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 59) {
                            s7 = peg$c0;
                            peg$currPos++;
                        }
                        else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c1);
                            }
                        }
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parse_();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parseInstrs();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parse_();
                                    if (s10 !== peg$FAILED) {
                                        s7 = [s7, s8, s9, s10];
                                        s6 = s7;
                                    }
                                    else {
                                        peg$currPos = s6;
                                        s6 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s3 = [s3, s4, s5];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c2(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseInstrs() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parseInstr();
            if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parseInstr();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parse_();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c3(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseInstr() {
        var s0;
        s0 = peg$parseKeywd();
        if (s0 === peg$FAILED) {
            s0 = peg$parseOp();
            if (s0 === peg$FAILED) {
                s0 = peg$parseName();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseRef();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseLs();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseObj();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseProp();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseNum();
                                    if (s0 === peg$FAILED) {
                                        s0 = peg$parseStr();
                                        if (s0 === peg$FAILED) {
                                            s0 = peg$parseSuper_Str();
                                            if (s0 === peg$FAILED) {
                                                s0 = peg$parseExpr();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseKeywd() {
        var s0;
        s0 = peg$parseIf();
        if (s0 === peg$FAILED) {
            s0 = peg$parseFor();
            if (s0 === peg$FAILED) {
                s0 = peg$parseWhile();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseLocal();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseVar();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseFun();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseAnon();
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseIf() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c4) {
            s1 = peg$c4;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c5);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseInstrs();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 58) {
                            s5 = peg$c6;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c7);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseBlock();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = [];
                                        s10 = peg$currPos;
                                        if (input.substr(peg$currPos, 4) === peg$c8) {
                                            s11 = peg$c8;
                                            peg$currPos += 4;
                                        }
                                        else {
                                            s11 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c9);
                                            }
                                        }
                                        if (s11 !== peg$FAILED) {
                                            s12 = peg$parse_();
                                            if (s12 !== peg$FAILED) {
                                                s13 = peg$parseInstrs();
                                                if (s13 !== peg$FAILED) {
                                                    s14 = peg$parse_();
                                                    if (s14 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 58) {
                                                            s15 = peg$c6;
                                                            peg$currPos++;
                                                        }
                                                        else {
                                                            s15 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                                peg$fail(peg$c7);
                                                            }
                                                        }
                                                        if (s15 !== peg$FAILED) {
                                                            s16 = peg$parse_();
                                                            if (s16 !== peg$FAILED) {
                                                                s17 = peg$parseBlock();
                                                                if (s17 !== peg$FAILED) {
                                                                    s11 = [s11, s12, s13, s14, s15, s16, s17];
                                                                    s10 = s11;
                                                                }
                                                                else {
                                                                    peg$currPos = s10;
                                                                    s10 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s10;
                                                                s10 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s10;
                                                            s10 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s10;
                                                        s10 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s10;
                                                    s10 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s10;
                                                s10 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s10;
                                            s10 = peg$FAILED;
                                        }
                                        while (s10 !== peg$FAILED) {
                                            s9.push(s10);
                                            s10 = peg$currPos;
                                            if (input.substr(peg$currPos, 4) === peg$c8) {
                                                s11 = peg$c8;
                                                peg$currPos += 4;
                                            }
                                            else {
                                                s11 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c9);
                                                }
                                            }
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parse_();
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parseInstrs();
                                                    if (s13 !== peg$FAILED) {
                                                        s14 = peg$parse_();
                                                        if (s14 !== peg$FAILED) {
                                                            if (input.charCodeAt(peg$currPos) === 58) {
                                                                s15 = peg$c6;
                                                                peg$currPos++;
                                                            }
                                                            else {
                                                                s15 = peg$FAILED;
                                                                if (peg$silentFails === 0) {
                                                                    peg$fail(peg$c7);
                                                                }
                                                            }
                                                            if (s15 !== peg$FAILED) {
                                                                s16 = peg$parse_();
                                                                if (s16 !== peg$FAILED) {
                                                                    s17 = peg$parseBlock();
                                                                    if (s17 !== peg$FAILED) {
                                                                        s11 = [s11, s12, s13, s14, s15, s16, s17];
                                                                        s10 = s11;
                                                                    }
                                                                    else {
                                                                        peg$currPos = s10;
                                                                        s10 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s10;
                                                                    s10 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s10;
                                                                s10 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s10;
                                                            s10 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s10;
                                                        s10 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s10;
                                                    s10 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s10;
                                                s10 = peg$FAILED;
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$currPos;
                                                if (input.substr(peg$currPos, 4) === peg$c10) {
                                                    s12 = peg$c10;
                                                    peg$currPos += 4;
                                                }
                                                else {
                                                    s12 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c11);
                                                    }
                                                }
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parse_();
                                                    if (s13 !== peg$FAILED) {
                                                        s14 = peg$parseBlock();
                                                        if (s14 !== peg$FAILED) {
                                                            s12 = [s12, s13, s14];
                                                            s11 = s12;
                                                        }
                                                        else {
                                                            peg$currPos = s11;
                                                            s11 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s11;
                                                        s11 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 === peg$FAILED) {
                                                    s11 = null;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    if (input.substr(peg$currPos, 3) === peg$c12) {
                                                        s12 = peg$c12;
                                                        peg$currPos += 3;
                                                    }
                                                    else {
                                                        s12 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                            peg$fail(peg$c13);
                                                        }
                                                    }
                                                    if (s12 === peg$FAILED) {
                                                        s12 = null;
                                                    }
                                                    if (s12 !== peg$FAILED) {
                                                        peg$savedPos = s0;
                                                        s1 = peg$c14(s3, s7, s9, s11);
                                                        s0 = s1;
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseFor() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c15) {
            s1 = peg$c15;
            peg$currPos += 3;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c16);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseName();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseInstrs();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 58) {
                                    s7 = peg$c6;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c7);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseBlock();
                                        if (s9 !== peg$FAILED) {
                                            if (input.substr(peg$currPos, 3) === peg$c12) {
                                                s10 = peg$c12;
                                                peg$currPos += 3;
                                            }
                                            else {
                                                s10 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c13);
                                                }
                                            }
                                            if (s10 === peg$FAILED) {
                                                s10 = null;
                                            }
                                            if (s10 !== peg$FAILED) {
                                                peg$savedPos = s0;
                                                s1 = peg$c17(s3, s5, s9);
                                                s0 = s1;
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseWhile() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c18) {
            s1 = peg$c18;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c19);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseInstrs();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 58) {
                            s5 = peg$c6;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c7);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseBlock();
                                if (s7 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c12) {
                                        s8 = peg$c12;
                                        peg$currPos += 3;
                                    }
                                    else {
                                        s8 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c13);
                                        }
                                    }
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c20(s3, s7);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseLocal() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseName();
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c21;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c22);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (input.charCodeAt(peg$currPos) === 39) {
                    s3 = peg$c21;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c22);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c23) {
                        s4 = peg$c23;
                        peg$currPos += 2;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c24);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parse_();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseInstrs();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c25(s1, s2, s6);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseVar() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseName();
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c21;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c22);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (input.charCodeAt(peg$currPos) === 39) {
                    s3 = peg$c21;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c22);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 61) {
                        s4 = peg$c26;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c27);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parse_();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseInstrs();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c28(s1, s2, s6);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseFun() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 3;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseName();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        s5 = [];
                        s6 = peg$currPos;
                        s7 = peg$parseName();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parse_();
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                        while (s6 !== peg$FAILED) {
                            s5.push(s6);
                            s6 = peg$currPos;
                            s7 = peg$parseName();
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parse_();
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 58) {
                                s6 = peg$c6;
                                peg$currPos++;
                            }
                            else {
                                s6 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c7);
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parse_();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseBlock();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parse_();
                                        if (s9 !== peg$FAILED) {
                                            if (input.substr(peg$currPos, 3) === peg$c12) {
                                                s10 = peg$c12;
                                                peg$currPos += 3;
                                            }
                                            else {
                                                s10 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c13);
                                                }
                                            }
                                            if (s10 === peg$FAILED) {
                                                s10 = null;
                                            }
                                            if (s10 !== peg$FAILED) {
                                                peg$savedPos = s0;
                                                s1 = peg$c31(s3, s5, s8);
                                                s0 = s1;
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseAnon() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c32) {
            s1 = peg$c32;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                s5 = peg$parseName();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s5 = [s5, s6];
                        s4 = s5;
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$currPos;
                    s5 = peg$parseName();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                        s4 = peg$c6;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c7);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parse_();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseBlock();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parse_();
                                if (s7 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c12) {
                                        s8 = peg$c12;
                                        peg$currPos += 3;
                                    }
                                    else {
                                        s8 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c13);
                                        }
                                    }
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c34(s3, s6);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseOp() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c35) {
            s1 = peg$c35;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c36);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c37) {
                s1 = peg$c37;
                peg$currPos += 2;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c38);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c39) {
                    s1 = peg$c39;
                    peg$currPos += 2;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c40);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c41) {
                        s1 = peg$c41;
                        peg$currPos += 2;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c42);
                        }
                    }
                    if (s1 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 60) {
                            s1 = peg$c43;
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c44);
                            }
                        }
                        if (s1 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 62) {
                                s1 = peg$c45;
                                peg$currPos++;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c46);
                                }
                            }
                            if (s1 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 43) {
                                    s1 = peg$c47;
                                    peg$currPos++;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c48);
                                    }
                                }
                                if (s1 === peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 126) {
                                        s1 = peg$c49;
                                        peg$currPos++;
                                    }
                                    else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c50);
                                        }
                                    }
                                    if (s1 === peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 45) {
                                            s1 = peg$c51;
                                            peg$currPos++;
                                        }
                                        else {
                                            s1 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c52);
                                            }
                                        }
                                        if (s1 === peg$FAILED) {
                                            if (input.charCodeAt(peg$currPos) === 42) {
                                                s1 = peg$c53;
                                                peg$currPos++;
                                            }
                                            else {
                                                s1 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c54);
                                                }
                                            }
                                            if (s1 === peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 47) {
                                                    s1 = peg$c55;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s1 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c56);
                                                    }
                                                }
                                                if (s1 === peg$FAILED) {
                                                    if (input.charCodeAt(peg$currPos) === 94) {
                                                        s1 = peg$c57;
                                                        peg$currPos++;
                                                    }
                                                    else {
                                                        s1 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                            peg$fail(peg$c58);
                                                        }
                                                    }
                                                    if (s1 === peg$FAILED) {
                                                        if (input.substr(peg$currPos, 2) === peg$c59) {
                                                            s1 = peg$c59;
                                                            peg$currPos += 2;
                                                        }
                                                        else {
                                                            s1 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                                peg$fail(peg$c60);
                                                            }
                                                        }
                                                        if (s1 === peg$FAILED) {
                                                            if (input.charCodeAt(peg$currPos) === 37) {
                                                                s1 = peg$c61;
                                                                peg$currPos++;
                                                            }
                                                            else {
                                                                s1 = peg$FAILED;
                                                                if (peg$silentFails === 0) {
                                                                    peg$fail(peg$c62);
                                                                }
                                                            }
                                                            if (s1 === peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 39) {
                                                                    s1 = peg$c21;
                                                                    peg$currPos++;
                                                                }
                                                                else {
                                                                    s1 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c22);
                                                                    }
                                                                }
                                                                if (s1 === peg$FAILED) {
                                                                    if (input.substr(peg$currPos, 2) === peg$c63) {
                                                                        s1 = peg$c63;
                                                                        peg$currPos += 2;
                                                                    }
                                                                    else {
                                                                        s1 = peg$FAILED;
                                                                        if (peg$silentFails === 0) {
                                                                            peg$fail(peg$c64);
                                                                        }
                                                                    }
                                                                    if (s1 === peg$FAILED) {
                                                                        if (input.charCodeAt(peg$currPos) === 64) {
                                                                            s1 = peg$c65;
                                                                            peg$currPos++;
                                                                        }
                                                                        else {
                                                                            s1 = peg$FAILED;
                                                                            if (peg$silentFails === 0) {
                                                                                peg$fail(peg$c66);
                                                                            }
                                                                        }
                                                                        if (s1 === peg$FAILED) {
                                                                            if (input.charCodeAt(peg$currPos) === 38) {
                                                                                s1 = peg$c67;
                                                                                peg$currPos++;
                                                                            }
                                                                            else {
                                                                                s1 = peg$FAILED;
                                                                                if (peg$silentFails === 0) {
                                                                                    peg$fail(peg$c68);
                                                                                }
                                                                            }
                                                                            if (s1 === peg$FAILED) {
                                                                                if (input.charCodeAt(peg$currPos) === 124) {
                                                                                    s1 = peg$c69;
                                                                                    peg$currPos++;
                                                                                }
                                                                                else {
                                                                                    s1 = peg$FAILED;
                                                                                    if (peg$silentFails === 0) {
                                                                                        peg$fail(peg$c70);
                                                                                    }
                                                                                }
                                                                                if (s1 === peg$FAILED) {
                                                                                    if (input.charCodeAt(peg$currPos) === 33) {
                                                                                        s1 = peg$c71;
                                                                                        peg$currPos++;
                                                                                    }
                                                                                    else {
                                                                                        s1 = peg$FAILED;
                                                                                        if (peg$silentFails === 0) {
                                                                                            peg$fail(peg$c72);
                                                                                        }
                                                                                    }
                                                                                    if (s1 === peg$FAILED) {
                                                                                        if (input.substr(peg$currPos, 2) === peg$c73) {
                                                                                            s1 = peg$c73;
                                                                                            peg$currPos += 2;
                                                                                        }
                                                                                        else {
                                                                                            s1 = peg$FAILED;
                                                                                            if (peg$silentFails === 0) {
                                                                                                peg$fail(peg$c74);
                                                                                            }
                                                                                        }
                                                                                        if (s1 === peg$FAILED) {
                                                                                            if (input.charCodeAt(peg$currPos) === 63) {
                                                                                                s1 = peg$c75;
                                                                                                peg$currPos++;
                                                                                            }
                                                                                            else {
                                                                                                s1 = peg$FAILED;
                                                                                                if (peg$silentFails === 0) {
                                                                                                    peg$fail(peg$c76);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c77();
        }
        s0 = s1;
        return s0;
    }
    function peg$parseName() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c4) {
            s2 = peg$c4;
            peg$currPos += 2;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c5);
            }
        }
        if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c10) {
                s2 = peg$c10;
                peg$currPos += 4;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                }
            }
            if (s2 === peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c8) {
                    s2 = peg$c8;
                    peg$currPos += 4;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c9);
                    }
                }
                if (s2 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c12) {
                        s2 = peg$c12;
                        peg$currPos += 3;
                    }
                    else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c13);
                        }
                    }
                    if (s2 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c15) {
                            s2 = peg$c15;
                            peg$currPos += 3;
                        }
                        else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c16);
                            }
                        }
                        if (s2 === peg$FAILED) {
                            if (input.substr(peg$currPos, 5) === peg$c18) {
                                s2 = peg$c18;
                                peg$currPos += 5;
                            }
                            else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c19);
                                }
                            }
                            if (s2 === peg$FAILED) {
                                if (input.substr(peg$currPos, 3) === peg$c78) {
                                    s2 = peg$c78;
                                    peg$currPos += 3;
                                }
                                else {
                                    s2 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c79);
                                    }
                                }
                                if (s2 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c29) {
                                        s2 = peg$c29;
                                        peg$currPos += 3;
                                    }
                                    else {
                                        s2 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c30);
                                        }
                                    }
                                    if (s2 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 4) === peg$c32) {
                                            s2 = peg$c32;
                                            peg$currPos += 4;
                                        }
                                        else {
                                            s2 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c33);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
            s1 = void 0;
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            if (peg$c80.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c81);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c82.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c83);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c82.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c83);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c84();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRef() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 96) {
            s1 = peg$c85;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c86);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseName();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c87(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseLs() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c88;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c89);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseInstrs();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c90;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c91);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c92(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseObj() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c93) {
            s1 = peg$c93;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c94);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 58) {
                    s5 = peg$c6;
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                    }
                }
                if (s5 !== peg$FAILED) {
                    s6 = peg$parseName();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseInstrs();
                        if (s7 !== peg$FAILED) {
                            s5 = [s5, s6, s7];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 58) {
                        s5 = peg$c6;
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c7);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseName();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseInstrs();
                            if (s7 !== peg$FAILED) {
                                s5 = [s5, s6, s7];
                                s4 = s5;
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                        s4 = peg$c90;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c91);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c95(s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseProp() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c96;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c97);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseName();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c98(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseNum() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c99.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c100);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c99.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 46) {
                s3 = peg$c96;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c97);
                }
            }
            if (s3 !== peg$FAILED) {
                s4 = [];
                if (peg$c99.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
                    }
                }
                if (s5 !== peg$FAILED) {
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        if (peg$c99.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c100);
                            }
                        }
                    }
                }
                else {
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c101();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseStr() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c102;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c103);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c104.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c105);
                }
            }
            if (s3 === peg$FAILED) {
                s3 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 92) {
                    s4 = peg$c106;
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c107);
                    }
                }
                if (s4 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c108);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c104.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c105);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 92) {
                        s4 = peg$c106;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c107);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (input.length > peg$currPos) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c108);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 34) {
                    s3 = peg$c102;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c103);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c109();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSuper_Str() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c106;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c107);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (input.length > peg$currPos) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c108);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (input.length > peg$currPos) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c108);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c110();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parse_() {
        var s0, s1;
        s0 = [];
        if (peg$c111.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c112);
            }
        }
        if (s1 === peg$FAILED) {
            s1 = peg$parseCmmnt();
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c111.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c112);
                }
            }
            if (s1 === peg$FAILED) {
                s1 = peg$parseCmmnt();
            }
        }
        return s0;
    }
    function peg$parseCmmnt() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c113) {
            s1 = peg$c113;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c114);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c115.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c116);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c115.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c116);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                    s3 = peg$c117;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c118);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseExpr() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c119;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c120);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseTerms();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                            s5 = peg$c121;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c122);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c123(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTerms() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseProds();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
                if (peg$c124.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c125);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parse_();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseTerms();
                        if (s6 !== peg$FAILED) {
                            s3 = [s3, s4, s5, s6];
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c126(s1, s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseProds() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseExps();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
                if (peg$c127.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c128);
                    }
                }
                if (s4 === peg$FAILED) {
                    s4 = null;
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parse_();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseProds();
                        if (s6 !== peg$FAILED) {
                            s3 = [s3, s4, s5, s6];
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c129(s1, s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseExps() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseFinal();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 94) {
                    s4 = peg$c57;
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c58);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parse_();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseExps();
                        if (s6 !== peg$FAILED) {
                            s3 = [s3, s4, s5, s6];
                            s2 = s3;
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c130(s1, s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseFinal() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 126) {
            s1 = peg$c49;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c50);
            }
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseParens();
            if (s2 === peg$FAILED) {
                s2 = peg$parseMath_Call();
                if (s2 === peg$FAILED) {
                    s2 = peg$parseMath_Const();
                    if (s2 === peg$FAILED) {
                        s2 = peg$parseExpr_Var();
                        if (s2 === peg$FAILED) {
                            s2 = peg$parseExpr_Num();
                        }
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c131(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParens() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c132;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c133);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseTerms();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                            s5 = peg$c117;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c118);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c134(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMath_Call() {
        var s0;
        s0 = peg$parseMath_Call_1();
        if (s0 === peg$FAILED) {
            s0 = peg$parseMath_Call_2();
        }
        return s0;
    }
    function peg$parseMath_Call_1() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parseMath_Fun_1();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c132;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c133);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseTerms();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                    s7 = peg$c117;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c118);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c135(s1, s5);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMath_Call_2() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        s1 = peg$parseMath_Fun_2();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c132;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c133);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseTerms();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 44) {
                                    s7 = peg$c136;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c137);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseTerms();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 41) {
                                                    s11 = peg$c117;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c118);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c138(s1, s5, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMath_Fun_1() {
        var s0;
        if (input.substr(peg$currPos, 3) === peg$c139) {
            s0 = peg$c139;
            peg$currPos += 3;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c140);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c141) {
                s0 = peg$c141;
                peg$currPos += 4;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c142);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c143) {
                    s0 = peg$c143;
                    peg$currPos += 4;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c144);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c145) {
                        s0 = peg$c145;
                        peg$currPos += 2;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c146);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c147) {
                            s0 = peg$c147;
                            peg$currPos += 3;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c148);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 3) === peg$c149) {
                                s0 = peg$c149;
                                peg$currPos += 3;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c150);
                                }
                            }
                            if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 3) === peg$c151) {
                                    s0 = peg$c151;
                                    peg$currPos += 3;
                                }
                                else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c152);
                                    }
                                }
                                if (s0 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c153) {
                                        s0 = peg$c153;
                                        peg$currPos += 3;
                                    }
                                    else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c154);
                                        }
                                    }
                                    if (s0 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 3) === peg$c155) {
                                            s0 = peg$c155;
                                            peg$currPos += 3;
                                        }
                                        else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c156);
                                            }
                                        }
                                        if (s0 === peg$FAILED) {
                                            if (input.substr(peg$currPos, 3) === peg$c157) {
                                                s0 = peg$c157;
                                                peg$currPos += 3;
                                            }
                                            else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c158);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseMath_Fun_2() {
        var s0;
        if (input.substr(peg$currPos, 4) === peg$c159) {
            s0 = peg$c159;
            peg$currPos += 4;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c160);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c161) {
                s0 = peg$c161;
                peg$currPos += 3;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c162);
                }
            }
        }
        return s0;
    }
    function peg$parseMath_Const() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c163) {
            s1 = peg$c163;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c164);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 960) {
                s1 = peg$c165;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c166);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c167) {
                    s1 = peg$c167;
                    peg$currPos += 3;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c168);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 964) {
                        s1 = peg$c169;
                        peg$currPos++;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c170);
                        }
                    }
                    if (s1 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 101) {
                            s1 = peg$c171;
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c172);
                            }
                        }
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c173();
        }
        s0 = s1;
        return s0;
    }
    function peg$parseExpr_Var() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 120) {
            s1 = peg$c174;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c175);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c176();
        }
        s0 = s1;
        return s0;
    }
    function peg$parseExpr_Num() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c99.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c100);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c99.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 46) {
                s3 = peg$c96;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c97);
                }
            }
            if (s3 !== peg$FAILED) {
                s4 = [];
                if (peg$c99.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
                    }
                }
                if (s5 !== peg$FAILED) {
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        if (peg$c99.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c100);
                            }
                        }
                    }
                }
                else {
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c177();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
module.exports = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
};
module.exports = module.exports;

},{"./types":6}],6:[function(require,module,exports){
exports.__esModule = true;
exports.Expr_Type = exports.Op = exports.Instr_Type = void 0;
var Instr_Type;
(function (Instr_Type) {
    Instr_Type[Instr_Type["op"] = 0] = "op";
    Instr_Type[Instr_Type["name"] = 1] = "name";
    Instr_Type[Instr_Type["ref"] = 2] = "ref";
    Instr_Type[Instr_Type["ls"] = 3] = "ls";
    Instr_Type[Instr_Type["obj"] = 4] = "obj";
    Instr_Type[Instr_Type["prop"] = 5] = "prop";
    Instr_Type[Instr_Type["num"] = 6] = "num";
    Instr_Type[Instr_Type["str"] = 7] = "str";
    Instr_Type[Instr_Type["expr"] = 8] = "expr";
    Instr_Type[Instr_Type["if"] = 9] = "if";
    Instr_Type[Instr_Type["for"] = 10] = "for";
    Instr_Type[Instr_Type["while"] = 11] = "while";
    Instr_Type[Instr_Type["local"] = 12] = "local";
    Instr_Type[Instr_Type["var"] = 13] = "var";
    Instr_Type[Instr_Type["fun"] = 14] = "fun";
    Instr_Type[Instr_Type["anon"] = 15] = "anon"; // Structures
})(Instr_Type || (Instr_Type = {}));
exports.Instr_Type = Instr_Type;
var Op;
(function (Op) {
    Op[Op["=="] = 0] = "==";
    Op[Op["!="] = 1] = "!=";
    Op[Op["<="] = 2] = "<=";
    Op[Op[">="] = 3] = ">=";
    Op[Op["<"] = 4] = "<";
    Op[Op[">"] = 5] = ">";
    Op[Op["+"] = 6] = "+";
    Op[Op["~"] = 7] = "~";
    Op[Op["-"] = 8] = "-";
    Op[Op["*"] = 9] = "*";
    Op[Op["/"] = 10] = "/";
    Op[Op["^"] = 11] = "^";
    Op[Op["%%"] = 12] = "%%";
    Op[Op["%"] = 13] = "%";
    Op[Op["'"] = 14] = "'";
    Op[Op["@="] = 15] = "@=";
    Op[Op["@"] = 16] = "@";
    Op[Op["&"] = 17] = "&";
    Op[Op["|"] = 18] = "|";
    Op[Op["!"] = 19] = "!";
    Op[Op["??"] = 20] = "??";
    Op[Op["?"] = 21] = "?"; // Special interaction
})(Op || (Op = {}));
exports.Op = Op;
var Expr_Type;
(function (Expr_Type) {
    Expr_Type[Expr_Type["add"] = 0] = "add";
    Expr_Type[Expr_Type["sub"] = 1] = "sub";
    Expr_Type[Expr_Type["mul"] = 2] = "mul";
    Expr_Type[Expr_Type["div"] = 3] = "div";
    Expr_Type[Expr_Type["pow"] = 4] = "pow";
    Expr_Type[Expr_Type["call"] = 5] = "call";
    Expr_Type[Expr_Type["expr_var"] = 6] = "expr_var";
    Expr_Type[Expr_Type["num"] = 7] = "num";
})(Expr_Type || (Expr_Type = {}));
exports.Expr_Type = Expr_Type;

},{}],7:[function(require,module,exports){
exports.__esModule = true;
exports.to_type = void 0;
function to_type(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
exports.to_type = to_type;

},{}]},{},[4])(4)
});
