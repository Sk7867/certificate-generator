//Need to rethink PDF placeholder extraction flow
// const extractPlaceholders = async (file: File): Promise<string[]> => {
//   const buffer = await file.arrayBuffer();
//   const pdfDoc = await getDocument({ data: buffer }).promise;
//   const placeHolders = new Set<string>();
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();
//     const textItems = content.items
//       .map((item: any) => item.str as string)
//       .join(" ");
//     const matches = textItems.match(/{{\s*[\w]+\s*}}/g);

//     if (matches) {
//       matches.forEach((match) => {
//         placeHolders.add(match.trim());
//       });
//     }
//   }
//   return Array.from(placeHolders);
// };

// export default extractPlaceholders;
