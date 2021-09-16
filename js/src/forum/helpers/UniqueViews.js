export default function (views, limit = null) {
    let names = new Array();
    let idNames = new Array();

    for (let i = 0; i < views.length; i++) {
        if(limit !== null && i > limit - 1) break;

        const view = views[i];
        const user = view.user();

        if(user !== false && idNames.indexOf(user.id()) == -1) {
            names.push(user);

            idNames.push(user.id());
        }
    }

    return names;
}
