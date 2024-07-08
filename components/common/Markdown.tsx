import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  children: string | string[];
};

const MarkDownComponent = ({ children }: MarkdownProps) => {
  const content = Array.isArray(children) ? children : [children];
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        ol: (props) => <ul className="list-inside list-decimal" {...props} />,
        a: (props) => (
          <a className="text-orange-500 underline" target="_blank" {...props} />
        ),
      }}
    >
      {content.join("")}
    </ReactMarkdown>
  );
};

export default MarkDownComponent;
