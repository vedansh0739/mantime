import {
  Title,
  Text,
  Anchor,
  TextInput,
  useMantineColorScheme,
  Button,
  ActionIcon,
} from '@mantine/core';
import classes from './Welcome.module.css';

// or if you're using outline icons

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
export function Welcome() {
  const hasRun = useRef(false);
  const [screenshot, setScreenshot] = useState('');
  const [modelimg, setmodelimg] = useState('');
  const [betcmd, setbetcmd] = useState('');
  const [audioData, setAudioData] = useState('');
  const [text, setText] = useState('');
  const [url, seturl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false); // New state to track if initiation was successful
  const [stoploading, setstoploading] = useState(false); // New state to track if initiation was successful
  const [responseText, setResponseText] = useState('');
  const [nav, setnav] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const inputRef = useRef(null);

  const handleTextClick = () => {
    // Select all text inside the input
    inputRef.current.select();
  };
  const urlclick = async () => {

    try {
      setnav(true)
      // Replace with your backend API URL and configuration
      const response = await fetch('https://127.0.0.1:8000/stream/gotourl/', {
        //||||DEV2PROD||||

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
        credentials: 'include',
      });

      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Replace with the URL to redirect to
        setScreenshot(data.screenshot);
        setnav(false)
        setIsInitiated(true)
        // setAudioData(data.audio);
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form');
    }


  };
  const handleRevert = async () => {
    try {
      setLoading(true);
      // Replace with the actual request you want to send
      const response = await fetch('https://127.0.0.1:8000/stream/goback/', {
        //||||DEV2PROD||||

        method: 'GET',

        credentials: 'include',
      });
      const data = await response.json();
      // Check if the request was successful
      setLoading(false);
      if (response.ok) {
        // Replace with the URL to redirect to
        setScreenshot(data.screenshot);
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };
  const handleSubmit = async () => {
    try {
      // Replace with your backend API URL and configuration
      const response = await fetch('https://127.0.0.1:8000/stream/initiator/', {
        //||||DEV2PROD||||

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: 'initiate' }),
        credentials: 'include',
      });

      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Replace with the URL to redirect to

        setstoploading(true);
        // setAudioData(data.audio);
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form');
    }
  };
  const handleTextSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://127.0.0.1:8000/stream/process/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: text }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        // Handle the response from the /stream/process endpoint
        setLoading(false);
        setScreenshot(data.screenshot);
        setmodelimg(data.modelimg);
        setbetcmd(data.betcmd);
      } else {
        alert('Failed to process text');
      }
    } catch (error) {
      console.error('Error submitting text', error);
      alert('Error submitting text');
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      handleSubmit();
      setColorScheme('dark');
      hasRun.current = true;
    }
  }, []);
  return (
    <>
      {isInitiated && (
        <div>
          <Title className={classes.title1} ta="center" mt={20} mb={10}>
            <Text inherit component="span" variant="gradient">
              Iter
            </Text>
          </Title>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* Buttons and TextInput on the same line */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <Button onClick={handleRevert} style={{ margin: '0 10px' }}>
                Revert 1 cmd
              </Button>

              <TextInput
                placeholder="Input Command"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rightSection={loading ? <Loader size="xs" /> : null}
                disabled={loading}
                style={{
                  margin: '0 10px',
                  width: '600px', // You can set this to any width you like
                }}
                ref={inputRef}
                onClick={handleTextClick}
              />

              <Button onClick={handleTextSubmit} style={{ margin: '0 10px' }}>
                Execute
              </Button>
            </div>

            {/* Image centered below */}
            {screenshot && (
              <img
                style={{
                  transition: 'opacity 0.3s ease-in-out',
                  maxWidth: '900px',
                  width: 'auto',
                  height: 'auto',
                }}
                className="dope"
                src={`data:image/png;base64,${screenshot}`}
                alt="Screenshot"
              />
            )}
            
          </div>
        </div>
      )}

      {!isInitiated && (
        <div>
          <Title className={classes.title2} ta="center" mt={10} style={{height:94}} >
            <Text inherit component="span" variant="gradient">
              Iter
            </Text>
          </Title>

          <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
            Make workflows with quick feedback and iteration{' '}
          </Text>
          <br></br>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '12vh',
            }}
          >
            <TextInput
              placeholder="Input URL"
              value={url}
              onChange={(e) => seturl(e.target.value)}
              style={{
                margin: '0 10px',
                width: '600px', // You can set this to any width you like
              }}
            />

            <Button onClick={urlclick} style={{ margin: '0 10px' }}>
              Start Creating Workflow
            </Button>
          </div>
          {!stoploading && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '25vh',
                }}
              >
                <Loader size="xl" variant="bars" />
              </div>

              <Text ta="center">Launching Browser Instance.</Text>
              <br></br>
            </>
          )}

          {stoploading && (
            <Title className={classes.title2} ta="center" mt={10}>
              <Text inherit component="span" variant="gradient">
                ✓
              </Text>
            </Title>
          )}
          {nav && <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '25vh',
                }}
              >
                <Loader size="xl" variant="bars" />
              </div>
            
            }

          
        </div>
      )}
    </>
  );
}
