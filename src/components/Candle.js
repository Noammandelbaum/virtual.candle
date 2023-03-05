import { Card, CardContent, IconButton, TextField, Typography, Link } from '@mui/material';
import Image from 'mui-image'
import candle_header from '../yakir title.jpeg'
import ShareIcon from '@mui/icons-material/Share'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import AssistantTypo from '../AssistantTypo';

const widthImage = "100%";
const marginTop = 2;
const marginBot = 3;

function Candle() {
    const [personalText, setPersonalText] = useState();

    const handleImageDownload = async () => {
        const element = document.getElementById('print'),
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');
        link.href = data;
        link.download = 'מדליקים נר בשבוע המודעות לשכול האזרחי.jpg';
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
        const filesArray = [new File([blob], 'מדליקים נר בשבוע המודעות לשכול האזרחי.jpg', { type: "image/jpeg", lastModified: new Date().getTime() })];
        const shareData = {
            files: filesArray,
        };
        navigator.share(shareData).then(() => {
            console.log('Shared successfully');
        })
    }

    function changeInput(e) {
        setPersonalText(e.target.value)
    }

    return (
        <>
            <AssistantTypo />
            < TextField
                onChange={changeInput}
                inputProps={{ maxLength: 40 }}
                label="זוכרים באהבה את"
                sx={{ mt: marginTop, mx: 10 }} />
            <div id="print" >
                <Card
                    sx={{
                        marginTop: marginTop,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "#f4edd5",
                    }}>
                    <Image
                        src={candle_header}
                        width={widthImage}
                    />
                    <CardContent>
                        <Typography
                            style={{
                                fontFamily: 'Assistant',
                                color: '#1da398',
                            }}
                            gutterBottom
                            variant="h6"
                            component="div"
                        >
                            {personalText && "זוכרים באהבה את"}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: 'Assistant',
                                color: '#1da398',
                            }}
                            gutterBottom
                            variant="h4"
                            component="div"
                        >
                            {personalText && ` ${personalText}`}
                        </Typography>  
                    </CardContent>
                </Card>
            </div >

          
            <IconButton
                color="primary"
                aria-label="שתף"
            >
                <ShareIcon
                    fontSize="large"
                    onClick={onShare}
                    sx={{ mt: marginTop }}
                />
            </IconButton>
            <Typography
                variant="h8"
                component="div"
            >
                לשתף עם העולם
            </Typography>
            <FileDownloadIcon
                onClick={handleImageDownload}
                fontSize="large"
                color="primary"
                sx={{ mt: marginTop }} />
            <Typography
                sx={{ mb: 5 }}
                variant="h8"
                component="div">
                הורדה
            </Typography>
            <Link
                sx={{ mb: marginBot }}
                href="https://yakirli.org/awareness-week/"
            >
                למידע נוסף אודות שבוע המודעות לשכול האזרחי
                </Link>
        </>
    );
}

export default Candle;
