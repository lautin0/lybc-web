import {
  Collapse,
  createMuiTheme,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ThemeOptions,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Face,
  Notifications,
  Settings,
} from "@material-ui/icons";
import ClippedDrawer from "components/Drawers/ClippedDrawer";
import LayoutContext from "context/LayoutContext";
import React, { ReactElement, useContext, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import PersonalSearchAppBar from "components/Navbars/PersonalSearchAppBar";
import MuiCommonModal from "components/Modals/MuiCommonModal";
import MuiDecisionModal from "components/Modals/MuiDecisionModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerContainer: {
    overflow: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  menuItem: {
    paddingLeft: theme.spacing(1),
    fontWeight: 600,
  },
}));

interface MenuItemType {
  title: string;
  path: string;
  icon?: ReactElement;
  children?: Array<MenuItemType>;
}

const personalFuncList: Array<MenuItemType> = [
  {
    title: "個人中心",
    path: "/personal/center",
    icon: <Face />,
    // children: [
    //    { title: "帳戶管理", path: '/personal/info', icon: <Face /> },
    //    { title: "文章狀態", path: '/personal/other', icon: <Spellcheck /> },
    //    { title: "喜愛列表", path: '/personal/other', icon: <Bookmark /> },
    // ]
  },
  {
    title: "通知",
    icon: <Notifications />,
    path: "/personal/notifications",
  },
];

interface Props {
  children: React.ReactNode;
}

const PersonalLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const { darkMode } = useContext(LayoutContext);

  const history = useHistory();
  const [expanded, setExpanded] = useState<any>({});

  const handleClick = (id: string) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };
  const drawer = (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {personalFuncList.map((item, index) =>
            item.children != null ? (
              <div key={item.title}>
                <ListItem button onClick={() => handleClick(item.title)}>
                  <ListItemIcon>
                    {index % 2 !== 0 ? <Notifications /> : <PersonIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  {expanded[item.title] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={expanded[item.title]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((subItem, idx) => (
                      <ListItem
                        key={idx}
                        button
                        className={classes.nested}
                        onClick={() => {
                          history.push(subItem.path!);
                        }}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <ListItem
                button
                key={item.title}
                onClick={() => {
                  history.push(item.path!);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography>{item.title}</Typography>} />
              </ListItem>
            )
          )}
          <Divider />
          <ListItem
            button
            onClick={() => {
              history.push("/personal/settings");
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={<Typography>帳戶設定</Typography>} />
          </ListItem>
        </List>
      </div>
    </>
  );

  const light: ThemeOptions = {
    palette: {
      type: "light",

      // Set 1
      // primary: {
      //    light: '#9a67ea',
      //    main: '#673ab7',
      //    dark: '#320b86',
      //    contrastText: '#fff',
      // },

      // secondary: {
      //    light: '#fff263',
      //    main: '#fbc02d',
      //    dark: '#c49000',
      //    contrastText: '#000',
      // },

      // Set 2
      // primary: {
      //    light: '#48ad88',
      //    main: '#007d5b',
      //    dark: '#005032',
      //    contrastText: '#fff',
      // },

      // secondary: {
      //    light: '#7b7bd5',
      //    main: '#494fa3',
      //    dark: '#0d2774',
      //    contrastText: '#fff',
      // },

      // Set 3
      primary: {
        light: "#b296d7",
        main: "#8269a5",
        dark: "#543d76",
        contrastText: "#fff",
      },

      secondary: {
        light: "#ffff81",
        main: "#ffd54f",
        dark: "#c8a415",
        contrastText: "#000",
      },
    },
  };

  const dark: ThemeOptions = {
    palette: {
      type: "dark",

      // Set 1
      // primary: {
      //    light: '#9a67ea',
      //    main: '#673ab7',
      //    dark: '#320b86',
      //    contrastText: '#fff',
      // },

      // secondary: {
      //    light: '#fff263',
      //    main: '#fbc02d',
      //    dark: '#c49000',
      //    contrastText: '#000',
      // },

      // Set 2
      // primary: {
      //    light: '#48ad88',
      //    main: '#007d5b',
      //    dark: '#005032',
      //    contrastText: '#fff',
      // },

      // secondary: {
      //    light: '#7b7bd5',
      //    main: '#494fa3',
      //    dark: '#0d2774',
      //    contrastText: '#fff',
      // },

      // Set 3
      primary: {
        light: "#b296d7",
        main: "#8269a5",
        dark: "#543d76",
        contrastText: "#fff",
      },

      secondary: {
        light: "#ffff81",
        main: "#ffd54f",
        dark: "#c8a415",
        contrastText: "#000",
      },
    },
  };

  const appliedTheme = createMuiTheme(darkMode ? dark : light);

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <MuiCommonModal />
        <MuiDecisionModal />
        <PersonalSearchAppBar />
        <ClippedDrawer drawer={drawer} />
        <main className={classes.content}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default PersonalLayout;
