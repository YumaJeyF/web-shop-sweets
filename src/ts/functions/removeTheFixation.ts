import { vars } from '../vars';

export const removeTheFixation = () => {
    const { body, container } = vars;

    if (body && container && body.style.position === 'fixed') {
        body.style.position = '';
        body.style.top = '';
        container.style.paddingRight = '';
    }
}