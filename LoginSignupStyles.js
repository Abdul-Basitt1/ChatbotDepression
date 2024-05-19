import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  lightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  lightImage: {
    height: 225,
    width: 90,
  },
  lightImageSmall: {
    height: 160,
    width: 65,
    opacity: 0.75,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    letterSpacing: 2,
  },
  formContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 16,
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    borderRadius: 20,
    width: '100%',
    marginBottom: 8,
  },
  inputText: {
    color: 'gray',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#00B0FF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#00B0FF',
  },
 
});
