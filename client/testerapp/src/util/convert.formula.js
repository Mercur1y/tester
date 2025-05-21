import {convertAsciiMathToLatex, renderMathInElement} from "mathlive";
import {useEffect, useRef} from "react";

export const convertAsciiToLatex = (ascii) => {
    let latex = convertAsciiMathToLatex(ascii);
    latex = latex.replace(/#([a-zA-Z])/g, '\\mathbf{$1}');
    return latex;
};

export const FormulaCell = ({ formula }) => {
    const latexFormula = convertAsciiToLatex(formula);
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            renderMathInElement(divRef.current);
        }
    }, [latexFormula]);

    return (
        <div ref={divRef} className="latex-formula">
            {`$$${latexFormula}$$`}
        </div>
    );
};