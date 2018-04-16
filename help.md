# Help

If your language is imperative/c-like, the common scenario begins with top-hierarchy being split in 2 supertypes:

    Expression
    Statement

The program is a list of statement, which is a statement itself.

You will probably want to have one class for type of statement that extends the statement base class.

A typical scenario looks like:

    statement block ( a list of statements )
    ite (if then else)
    for (a for loop with its initialization statements list, check expression, increment statements, and block
    while (similar, but only check expression
    variable declaration
    assignment (including += -= ++ --, you can wrap all in one class with an operator field, a lval and an rval)
    Function call (void one)

For the expressions:

    Bop (binary operation, anything that has 2 operands and 1 operator i.e. + - * / % | & && || == <
    Uop (unary operation, anything that has 1 operand and 1 operator i.e. ~ !)
    Function call (not-void ones)
    Conditional expression ( exp ? true val : false val )

The good thing of having this 2 abstractions (expressions and statements) is that inside all your classes, you will have abstract types, and will be able to visit the AST with the visitor pattern, for example.

For example, some classes would look like this (pseudocode):

```cpp
class Ite extends Statement {
   Expression condition;
   Statement ifBranch;
   Statement elseBranch;
}


class Bop extends Expression {
   BOperator operator;  // +, -. * or whatever
   Expression left;     // Left operand
   Expression right;    // Right operand
}


class StatementBlock extends Statement {
   List<Statement> statements;
}


class Assignment extends Statement {
   AOperator assignOp;  // = += -= etc.
   LVal lvalue;         // The lvalue cannot be an arbitrary expression, you will usually have a specific type for it
   Expression rvalue;   // Right value
}
```
Also, you will need some way to represent types (for the AST, just static types are enough, if you project to implement some back-end as well, you will need some dynamic types too).

Static types can usually be specified with some enumerations, if you don't plan to support fixed-size arrays which need a size information. If you want fixed-size arrays with, size, you can implement one class for type and have the array type hold additional size information.

```cpp
enum Type {
   CHAR,
   SHORT,
   INT,
   LONG,
   FLOAT,
   DOUBLE,
   ARRAY
}

class Float extends StaticType {
    final Type type = Type.FLOAT;
}

class Array extends StaticArray {
    final Type type = Type.ARRAY;

    int size;
}
```
You will then instantiate one StaticType instance for every type in the AST, for example when the user declares a variable. You will be able to use the same hierarchy if you plan to do static type-checking in the future, also.

As for running/interpreting the code in the AST form, you will need a Memory which will hold a stack/heap containing information about runtime memory. At that point you will need to store values together with their type information.
