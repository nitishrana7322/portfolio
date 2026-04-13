/**
 * Converts a Google Drive sharing link into a direct link that can be used in an <img> tag.
 */
export function getDirectImageUrl(url: string | undefined): string {
  if (!url) return "";
  
  // Handle Google Drive links
  if (url.includes("drive.google.com")) {
    const fileId = url.match(/\/d\/([^/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
    if (fileId) {
      // Use the thumbnail endpoint which is often more reliable for direct embedding
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  
  return url;
}
