import {XMarkIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import {fetchHandler} from "../../utils/fetchHandler.ts";

interface SettingsCardProps {
    onClose: () => void;
}

const SettingsCard = ({ onClose }: SettingsCardProps) => {
    const [eventLimit, setEventLimit] = useState<number>(1);
    const [invitationLimit, setInvitationLimit] = useState<number>(1);
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

    const handleSubmit = async () => {
        try {
            const res = await fetchHandler('/setting', {
                method: "PUT",
                body: JSON.stringify({
                    eventLimit: eventLimit,
                    invitationLimit: invitationLimit,
                }),
            });

            console.log(res);

            if (!res.ok) {
                console.error("Failed to update settings:", res.statusText);
                setSubmitSuccess(false);
                return;
            }

            setSubmitSuccess(true);
        } catch (error) {
            console.error("Error while updating settings:", error);
            setSubmitSuccess(false);
        }
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20  bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    <XMarkIcon height={24} width={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Global Settings</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Event Limit</label>
                        <input type="number"
                               className="w-full p-2 border rounded"
                               value={eventLimit}
                               onChange={(e) => setEventLimit(Number(e.target.value))}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Invitation Limit</label>
                        <input type="number"
                               className="w-full p-2 border rounded"
                               value={invitationLimit}
                               onChange={(e) => setInvitationLimit(Number(e.target.value))}/>
                    </div>
                    <button className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={handleSubmit}>Save</button>
                    {submitSuccess === true && (
                        <div className="mt-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300">
                            🎉 Setting changed successfully!
                        </div>
                    )}

                    {submitSuccess === false && (
                        <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300">
                            ❌ Something went wrong. Please try again.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsCard;
