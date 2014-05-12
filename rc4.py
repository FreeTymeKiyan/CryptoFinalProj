def main():
	msg = 'Victory is mine'
	print 'input msg:', msg
	enciphered = rc4(msg)
	print 'enciphered:', enciphered
	deciphered = rc4(enciphered)
	print 'deciphered:', deciphered
	return

def rc4(msg):
	enciphered = '' 
	s = []
	initS(s)	

	i, j = 0, 0
	for k in range(len(msg)):
		i = (i + 1) % 256
		j = (j + s[i]) % 256
		s[i], s[j] = s[j], s[i]
		a = ord(msg[k]) ^ s[(s[i] + s[j]) % 256]
		l = chr(a)
		enciphered += l
	return enciphered

def initS(s):
	key = [1, 7, 1, 7] 
	for i in range(256):
		s.append(i)
	j = 0
	for i in range(256):
		j = (j + s[i] + key[i % (len(key))]) % 256
		s[i], s[j] = s[j], s[i]

if __name__ == '__main__':
	main()
