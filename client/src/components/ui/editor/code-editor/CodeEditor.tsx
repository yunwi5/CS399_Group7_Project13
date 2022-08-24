import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import monaco from 'monaco-editor';
import { Language } from '../../../../models/enums';
import ExpandShrinkToggler from '../../buttons/icon-buttons/ExpandShrinkToggler';

type Monaco = typeof monaco;
type CodeEditor = monaco.editor.IStandaloneCodeEditor;

interface Props {
    language?: Language;
    onChange(value: string | undefined): void;
    showHeader?: boolean;
    value?: string;
    width?: string;
    height?: string;
    validation?: boolean;
}

const CodeEditor: React.FC<Props> = ({
    language,
    showHeader = true,
    onChange,
    width,
    height,
    value,
    validation = true,
}) => {
    const editorRef = useRef<CodeEditor>(null);
    const [isShrinked, setIsShrinked] = useState(false);

    const handleMount = (editor: CodeEditor, monaco: Monaco) => {
        (editorRef as any).current = editor;
    };

    const handleEditorWillMount = (monaco: Monaco) => {
        // here is the monaco instance
        // do some configuration before editor is mounted
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        // Skip validation if the editor settings should skip it.
        // For examples, test cases code skips validation.
        if (!validation) {
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                noSyntaxValidation: true,
                noSemanticValidation: true,
            });
        }
    };

    return (
        <div className="flex flex-col border-2 bg-white border-gray-300 shadow-md focus-within:shadow-lg focus-within:outline focus-within:outline-2 focus-within:outline-gray-200 rounded-sm overflow-hidden">
            {showHeader && (
                <div className="flex-between px-3 py-2 text-gray-700 bg-gray-300/90 capitalize text-lg">
                    {language ?? 'Python'}
                    <ExpandShrinkToggler
                        isShrinked={isShrinked}
                        setIsShrinked={setIsShrinked}
                    />
                </div>
            )}
            {!isShrinked && (
                <Editor
                    className="min-h-[7.5rem] pt-3"
                    language={getMonacoLanguageName(language) ?? 'python'}
                    value={value}
                    onChange={onChange}
                    beforeMount={handleEditorWillMount}
                    onMount={handleMount}
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
};

function getMonacoLanguageName(lang: Language | undefined) {
    switch (lang) {
        case Language.CSHARP:
            return 'csharp';
        case Language.CPP:
            return 'cpp';
        default:
            return lang?.toLowerCase();
    }
}

export default CodeEditor;
