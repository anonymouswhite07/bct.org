import fs from "fs";
import path from "path";
import https from "https";

// ── Config ───────────────────────────────────────────────────────────────────
const CLOUD_NAME    = "dcxaldazg";
const UPLOAD_PRESET = "trust_upload";
const FOLDER        = "trust-gallery";

const PHOTOS_DIR    = "C:\\Users\\jonat\\Downloads\\WhatsApp Unknown 2026-05-17 at 3.05.15 AM";
const OUT_FILE      = "uploaded_photos.json";

// ── Helpers ───────────────────────────────────────────────────────────────────
function httpsPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method: "POST", headers };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", c => (data += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

function uploadToCloudinary(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(filePath);
    const boundary = "----CloudinaryBoundary" + Date.now();
    const nl = "\r\n";

    const preamble = Buffer.from(
      `--${boundary}${nl}Content-Disposition: form-data; name="upload_preset"${nl}${nl}${UPLOAD_PRESET}${nl}` +
      `--${boundary}${nl}Content-Disposition: form-data; name="folder"${nl}${nl}${FOLDER}${nl}` +
      `--${boundary}${nl}Content-Disposition: form-data; name="file"; filename="${fileName}"${nl}Content-Type: image/jpeg${nl}${nl}`
    );
    const epilogue = Buffer.from(`${nl}--${boundary}--${nl}`);
    const body = Buffer.concat([preamble, fileBuffer, epilogue]);

    httpsPost(
      "api.cloudinary.com",
      `/v1_1/${CLOUD_NAME}/image/upload`,
      {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "Content-Length": body.length,
      },
      body
    ).then(({ status, body: json }) => {
      if (json.error) reject(new Error(json.error.message));
      else if (json.secure_url) resolve(json.secure_url);
      else reject(new Error(`Cloudinary status ${status}`));
    }).catch(reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const files = fs.readdirSync(PHOTOS_DIR).filter(f =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  console.log(`\n📸 Found ${files.length} photos to upload\n`);

  const urls = [];
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const filePath = path.join(PHOTOS_DIR, fileName);
    const label    = fileName.slice(0, 48).padEnd(48);
    process.stdout.write(`[${String(i + 1).padStart(2)}/${files.length}] ${label} ... `);

    try {
      const imageUrl = await uploadToCloudinary(filePath, fileName);
      urls.push(imageUrl);
      console.log("✅");
    } catch (err) {
      console.log(`❌  ${err.message}`);
      failCount++;
    }

    await new Promise(r => setTimeout(r, 250));
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(urls, null, 2));

  console.log(`\n────────────────────────────────────────────`);
  console.log(`✅  Uploaded successfully: ${urls.length}`);
  console.log(`❌  Failed:               ${failCount}`);
  console.log(`\n🎉 URLs saved to ${OUT_FILE}\n`);
}

main().catch(console.error);
