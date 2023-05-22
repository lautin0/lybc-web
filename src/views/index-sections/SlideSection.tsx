import LoadingDiv from "components/Loading/LoadingDiv";
import { PostFilter, PostType, usePostsQuery } from "generated/graphql";
import { useCallback, useMemo, useRef, useState } from "react";
import { FormattedDate, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import UNIVERSALS from "Universals";
import noImg from "assets/img/no-img.jpg";
import { useMediaQuery, useTheme } from "@material-ui/core";

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: false,
  pauseOnHover: true,
  autoplaySpeed: 6000,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

function SlideSection() {
  const theme = useTheme();
  const isMid = useMediaQuery(theme.breakpoints.only("md"));
  const isLarge = useMediaQuery(theme.breakpoints.only("lg"));
  const isXLarge = useMediaQuery(theme.breakpoints.only("xl"));

  const history = useHistory();

  const intl = useIntl();

  const dummyList = useRef([{}, {}, {}]);

  const postFilter: PostFilter = useMemo(
    () => ({
      AND: [{ parentIDNotNull: false }],
      type: PostType.Sharing,
    }),
    []
  );
  const { loading, data: postData } = usePostsQuery({
    variables: { first: 5, postFilter: postFilter },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = useCallback(
    (e: any) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );

  return (
    <div
      className="photos section mx-5"
      style={{ marginTop: 150, marginBottom: 150 }}
      id="Photos"
    >
      <div className="section-head">
        <h2>{intl.formatMessage({ id: "app.featured" })}</h2>
      </div>
      <div className="slider-section photos-list">
        <Slider
          beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}
          {...settings}
        >
          {loading &&
            dummyList.current.map((item, idx) => {
              return <LoadingDiv key={idx} />;
            })}
          {!loading &&
            postData?.posts.edges!?.slice(0, 9).map((item, index) => {
              return (
                <div
                  onClickCapture={handleOnItemClick}
                  key={index}
                  className="photos-item"
                >
                  <div
                    className="gatsby-image-wrapper"
                    onClick={() => {
                      history.push("sharing/" + item.node?._id);
                    }}
                  >
                    {item.node?.imageURI && (
                      <img
                        alt="no blog preview"
                        style={{
                          width: isMid
                            ? 410
                            : isLarge || isXLarge
                            ? "100%"
                            : "unset",
                          height: isXLarge
                            ? 350
                            : isMid
                            ? 270
                            : isLarge
                            ? 300
                            : "unset",
                          objectFit: "cover",
                        }}
                        src={
                          UNIVERSALS.GOOGLE_STORAGE_ENDPOINT +
                          item.node?.imageURI
                        }
                      />
                    )}
                    {!item.node?.imageURI && (
                      <img
                        alt="no blog preview"
                        style={{
                          width: isMid
                            ? 410
                            : isLarge || isXLarge
                            ? "100%"
                            : "unset",
                          height: isXLarge
                            ? 350
                            : isMid
                            ? 270
                            : isLarge
                            ? 300
                            : "unset",
                        }}
                        src={noImg}
                      />
                    )}
                    <h4>
                      {
                        <FormattedDate
                          value={item.node?.creDttm}
                          year="numeric"
                          month="short"
                          day="numeric"
                        />
                      }
                    </h4>
                    <h3>
                      <strong>{item.node?.title}</strong>
                    </h3>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}
export default SlideSection;
