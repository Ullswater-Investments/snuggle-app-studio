import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidDiagram } from './MermaidDiagram';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-slate dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className: codeClassName, children, ...props }) {
            const match = /language-(\w+)/.exec(codeClassName || '');
            const language = match ? match[1] : '';
            const codeContent = String(children).replace(/\n$/, '');

            // Render Mermaid diagrams
            if (language === 'mermaid') {
              return <MermaidDiagram chart={codeContent} className="my-6" />;
            }

            // Inline code
            if (!match) {
              return (
                <code 
                  className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" 
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Code blocks with syntax highlighting
            return (
              <div className="relative group my-4">
                <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded opacity-70">
                  {language}
                </div>
                <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto">
                  <code className={cn("text-sm font-mono", codeClassName)} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          h1({ children }) {
            const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h1 id={id} className="text-4xl font-bold mt-8 mb-4 pb-2 border-b scroll-mt-20">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h2 id={id} className="text-2xl font-semibold mt-8 mb-3 pb-1 border-b scroll-mt-20">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h3 id={id} className="text-xl font-semibold mt-6 mb-2 scroll-mt-20">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>;
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-muted">{children}</thead>;
          },
          th({ children }) {
            return (
              <th className="border border-border px-4 py-2 text-left font-semibold">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-border px-4 py-2">
                {children}
              </td>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a 
                href={href} 
                className="text-primary hover:underline underline-offset-2"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="leading-relaxed">{children}</li>;
          },
          p({ children }) {
            return <p className="my-3 leading-relaxed">{children}</p>;
          },
          hr() {
            return <hr className="my-8 border-border" />;
          },
          strong({ children }) {
            return <strong className="font-semibold text-foreground">{children}</strong>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
