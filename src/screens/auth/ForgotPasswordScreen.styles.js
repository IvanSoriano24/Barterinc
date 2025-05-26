import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f1f2f6',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#444',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0b0f4d',
    borderRadius: 50,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  returnText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#222',
  },
});