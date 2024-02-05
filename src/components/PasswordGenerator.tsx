import React, { useState } from 'react';
import axios from 'axios';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [length, setLength] = useState<number>(6);
    const [lowerCase, setLowerCase] = useState<boolean>(true);
    const [upperCase, setUpperCase] = useState<boolean>(true);
    const [digits, setDigits] = useState<boolean>(true);
    const [specialChars, setSpecialChars] = useState<boolean>(true);
    const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false)

    const generatePassword = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v2/generate', {
                params: {
                    length,
                    lowerCase,
                    upperCase,
                    digits,
                    specialChars,
                },
            });

            setPassword(response.data.password);
        } catch (error) {
            console.error('Error generating password:', error);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setShowCopyMessage(true)
            setTimeout(() => {
                setShowCopyMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Error copying password to clipboard:', error);
        }
    }

    return (
        <div className="">
            <h1 className="text-gray-700 text-3xl font-bold mb-6">Password Generator</h1>
            <div className="my-4">
                <label className="text-gray-700 text-xl mr-2" htmlFor="length">
                    Length:
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-16 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="my-4">
                <label className="text-gray-700 text-xl mr-2">
                    LowerCase:
                    <input
                        type="checkbox"
                        checked={lowerCase}
                        onChange={() => setLowerCase(!lowerCase)}
                        className="form-checkbox h-5 w-5 mx-2"

                    />
                </label>
            </div>
            <div className="my-4">
                <label className="text-gray-700 text-xl mr-2">
                    UpperCase:
                    <input
                        type="checkbox"
                        checked={upperCase}
                        onChange={() => setUpperCase(!upperCase)}
                        className="form-checkbox h-5 w-5 mx-2"
                    />
                </label>
            </div>
            <div className="my-4">
                <label className="text-gray-700 text-xl mr-2">
                    Digits:
                    <input
                        type="checkbox"
                        checked={digits}
                        onChange={() => setDigits(!digits)}
                        className="form-checkbox h-5 w-5 mx-2"
                    />
                </label>
            </div>
            <div className="my-4">
                <label className="text-gray-700 text-xl mr-2">
                    Special Characters:
                    <input
                        type="checkbox"
                        checked={specialChars}
                        onChange={() => setSpecialChars(!specialChars)}
                        className="form-checkbox h-5 w-5 mx-2"
                    />
                </label>
            </div>
            <div className='my-4 flex justify-center'>
                <button
                    onClick={generatePassword}
                    className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Generate Password
                </button>
            </div>

            {password && (
                <div className='bg-green-400 p-4 rounded-md my-4 flex justify-center'>
                    {/* <h2 className="text-xl font-semibold mb-2">Generated Password:</h2> */}
                    <p className='text-xl'>{password}</p>
                    <button
                        onClick={copyToClipboard}
                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Copy
                    </button>
                    {showCopyMessage && (
                        <div className="fixed bottom-0 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-md">
                            Password copied to clipboard!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
