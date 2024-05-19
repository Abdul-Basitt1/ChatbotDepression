import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FF5252',
  },
  quoteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    // Add the following background styling for a light gradient
    backgroundColor: 'transparent', // Set a transparent background
    overflow: 'hidden', // Ensure the gradient doesn't overflow
    elevation: 5, // Add elevation for a subtle shadow
  },
  quoteBackground: {
    flex: 1,
    borderRadius: 16,
  },
  quote: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
  },
  section: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 20,
  },
  addButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  flatList: {
    flex: 1,
  },
  card: {
    width: 150,
    height: 175,
    borderRadius: 15, // Rounded corners
    overflow: 'hidden', // Clip the shadow
    margin: 3, // Add margin for separation
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 40, // Half of the width/height to make it a circle
  },
  cardText: {
    marginTop: 8,
    fontWeight: 'normal',
  },
  // card: {
  //   // backgroundColor: '#AAA',
  //   // padding: 16,
  //   // borderRadius: 16,
  //   // marginBottom: 16,
  //   // shadowColor: '#000',
  //   // shadowOffset: { width: 0, height: 4 },
  //   // shadowOpacity: 0.2,
  //   // shadowRadius: 5,
  //   // flex: 1, // Add this to make cards equal height in a row
  //   // margin: 8, // Add this for spacing between cards
  //   borderWidth: 1,
  //   borderColor: 'rgba(0, 0, 0, 0.1)',
  //   borderRadius: 8,
  //   padding: 10,
  // },
  // cardImage: {
  //   width: '100%',
  //   height: 120, // Set a fixed height for symmetry
  //   marginBottom: 8,
  //   borderRadius: 8,
  //   resizeMode: 'cover', // Ensure the image covers the entire space
  // },
  // cardText: {
  //   color: '#333',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   textAlign: 'center',
  // },
//   quote: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#333',
//   },
});
