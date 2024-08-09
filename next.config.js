/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/Cohere-AI",//This,
  output: "export", //This and..
  reactStrictMode: true, //This is for deploying to github pages. Remove to revert back.
};

module.exports = nextConfig;
