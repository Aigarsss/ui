// TODO, handle case when doesnt exist
export const getImageUrl = (id: string, imageDefault: string) => {
	return `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${id}%2Fdefault%2F${imageDefault}.png&w=275&q=75`;
};
