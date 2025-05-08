import { BaseModal, BaseModalProps } from './BaseModal';

type InformOption = 'accepted-public' | 'accepted-private' | 'pending-private' | 'all-private';

interface InformModalProps extends BaseModalProps {
  onSubmit: (message: string, option: InformOption) => Promise<void>;
  isPublicEvent: boolean;
}

interface InformModalState {
  message: string;
  selectedOption: InformOption;
}

export default class InformModal extends BaseModal<InformModalProps> {
  state: InformModalState = {
    message: '',
    selectedOption: this.props.isPublicEvent ? 'accepted-public' : 'accepted-private'
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await this.props.onSubmit(this.state.message, this.state.selectedOption);
    this.setState({ message: '' });
    this.props.onClose();
  };

  render() {
    const { show, onClose, isPublicEvent } = this.props;
    const { selectedOption, message } = this.state;

    if (!show) return null;

    return (
      <div className={this.modalStyles.overlay}>
        <div className={this.modalStyles.backdrop} onClick={onClose}></div>
        <div className={this.modalStyles.container}>
          <h2 className={this.modalStyles.title}>Inform Participants</h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            {!isPublicEvent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select who to inform:
                </label>
                <select
                  value={selectedOption}
                  onChange={(e) => this.setState({ 
                    selectedOption: e.target.value as InformOption 
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="accepted-private">Accepted Invitees</option>
                  <option value="pending-private">Pending Invitees</option>
                  <option value="all-private">All Invitees</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message:
              </label>
              <textarea
                value={message}
                onChange={(e) => this.setState({ message: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Write your message here..."
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}