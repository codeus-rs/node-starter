const hider = (property: string) => {
    if (property !== undefined && property !== null && property !== '') {
        let hidden = '';
        for (let i = 0; i < property.length; ++i) {
            hidden += '*';
        }
        return hidden;
    } else {
        return '<EMPTY>';
    }
};

export default hider;
