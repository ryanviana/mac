import {
  addNewClick,
  getLinkByReference,
  getReferenceByReference,
  newIpClick,
} from "@/mac-api";

export default async function handler(req, res) {
  const { reference } = req.query;
  if (reference) {
    const referenceRegister = await getReferenceByReference(reference);
    console.log("referenceRegister:", referenceRegister);
    const link = await getLinkByReference("/" + reference);
    if (link) {
      await PayPerClick(req, referenceRegister);
      res.status(200).json({ url: link });
    }
  }
}

async function PayPerClick(req, referenceRegister) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const url = req.url;
  const reference = "/" + req.query;

  if (newIpClick(ip, reference)) {
    await addNewClick(ip, url);
  }

  return { props: {} };
}
