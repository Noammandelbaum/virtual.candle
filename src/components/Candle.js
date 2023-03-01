import { Button, ButtonGroup, ListItem, Card, CardActions, CardContent, IconButton, TextField, Typography, Divider, Dialog } from '@mui/material';
import Image from 'mui-image'
import candle_image from '../yakir1.jpg'
import ShareIcon from '@mui/icons-material/Share'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { Stack } from '@mui/system';
// import rtlPlugin from 'stylis-plugin-rtl';

function Candle() {
    const handleImageDownload = async () => {
        const element = document.getElementById('print'),
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');
        link.href = data;

        link.download = 'downloaded-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    async function onShare() {
        const element = document.getElementById('print'),
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg');
        const response = await fetch(data);
        const blob = await response.blob();
        const filesArray = [new File([blob], 'yakir1.jpg', { type: "image/jpeg", lastModified: new Date().getTime() })];
        const shareData = {
            files: filesArray,
        };
        navigator.share(shareData).then(() => {
            console.log('Shared successfully');
        })
    }
    function changeInput(e){
        setPersonalText(e.target.value)
    }

    const [personalText, setPersonalText] = useState();
    return (
        <>
            <div id="print">
                <Card
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "#D6C584",
                    }}>
                    <Image src={candle_image}
                        // height="100%"
                        width="95%"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                            {personalText && "אנחנו זוכרים את"}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" >
                            {personalText ? `${personalText}` : `משפחות השכול האזרחי אנחנו  אתכם`}
                        </Typography>
                        <Typography variant="h6" component="div">
                            אתם לא לבד בסיפור הזה
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            {/* <Dialog dir="rtl"> */}
            <TextField
                onChange={changeInput}
                autoFocus
                inputProps={{ maxLength: 40 }}
                width="100%"
                // helperText="כתוב את השם"
                label="אנחנו זוכרים את"
                sx={{ mt: 2 }} />
            {/* </Dialog> */}
            {/* <Divider variant="middle" /> */}
            {/* <ButtonGroup variant="text" aria-label="text button group"> */}
            <IconButton color="primary" aria-label="שתף" >
                <ShareIcon fontSize="large" onClick={onShare} sx={{ mx: 20,mt:2 }} />
            </IconButton>
            <Typography variant="h8" component="div">
                לשתף עם העולם
            </Typography>
            {/* <Divider orientation="vertical" flexItem /> */}
            <FileDownloadIcon onClick={handleImageDownload} fontSize="large" color="primary" sx={{ mt: 5 }} />

        </>
    );
}

export default Candle;
