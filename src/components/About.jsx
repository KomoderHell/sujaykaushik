import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  introTextContainer: {
    width: '50%',
    fontSize: '1.1rem',
    textAlign: 'left',
  },
  introImageContainer: {
    width: '25%',
    marginRight: '16px',
  },
  introImage: {
    width: '100%',
    marginLeft: '16px',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <div style={styles.introContainer}>
                <div style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </div>
                <div style={styles.introImageContainer}>
                  <img
                    style={styles.introImage}
                    src={data?.imageSource}
                    alt="profile"
                  />
                </div>
              </div>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
