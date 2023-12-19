import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

export const demoPlugin = (md: MarkdownIt) => {
    md.use(container, 'demo', {
        validate(params) {
            return params.trim().match(/^demo\s+(.*)$/) != null
        },

        render(tokens, idx, _options, env) {
            const token = tokens[idx];
            if (token.type.endsWith('open')) {
                const componentName = token.info.trim().split(' ')[1]
                return md.render(`
<div class="demo-section">\n
<demo source-file="${componentName}" />\n
<IplExpandingSpace title="View Source" class="source-example">\n
<<< @/examples/${componentName}.vue#example{vue-html}
</IplExpandingSpace>\n
</div>
                `, env)
            } else {
                return ''
            }
        }
    } satisfies container.ContainerOpts)
}
