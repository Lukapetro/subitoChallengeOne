import { Typography } from "@mui/material";

export default function ErrorText(params) {
  return <Typography variant="subtitle2" sx={{ color: "red" }}>
    {params.text}
  </Typography>
};
