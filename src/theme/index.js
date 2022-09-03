export const Theme = {
  colors: {
    primary: "#f50057",
    secondary: "#1b333d",
    complementary1: "#464646",
    complementary2: "#f1f1f1",
  },
  fonts: {
    titleWhite: {
      fontSize: 20,
      fontWeight: "700",
      color: "white",
    },
    titleBlue: {
      textAlign:'center',
      fontSize: 24,
      fontWeight: "700",
      color: "#1b333d",
    },
    titleRed: {
      fontSize: 20,
      fontWeight: "600",
      color: "#f50057",
    },
    description: {
      fontSize: 18,
      fontWeight: "400",
      color: "white",
    },
    descriptionBlue: {
      fontSize: 18,
      fontWeight: "400",
      color: "#1b333d",
    },
    descriptionGray: {
      fontSize: 18,
      fontWeight: "400",
      color: "gray",
    },
    titleBig:{
      textAlign:'left',
      fontSize: 24,
      fontWeight: "700",
      color: "#1b333d",
    },
    titleBigWhite:{
      textAlign:'left',
      fontSize: 24,
      fontWeight: "700",
      color: "white",
    }
  },
  buttons: {
    primary: {
      backgroundColor: "#f50057",
      height: 50,
      marginBottom: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    primaryOutlined: {
      borderColor: "#f50057",
      borderWidth:2,
      height: 50,
      marginBottom: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    secondary: {
      height: 50,
      marginTop:10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      width:'100%',
      backgroundColor: "#1b333d",
    },
  },
  containers: {
    containerParent: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#f1f1f1",
    },
    containerFlex: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#f1f1f1",
    },
  },
  input: {
    basic: {
      height: 50,
      marginBottom: 10,
      backgroundColor: "white",
      paddingHorizontal: 10,
      borderColor: "black",
      borderRadius: 10,
    },
  },
  shadow:{
    basic:{
      elevation: 20,
    shadowColor: '#52006A',
    }
  }
};
