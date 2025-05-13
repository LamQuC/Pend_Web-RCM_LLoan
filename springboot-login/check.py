import pickle
import sys

def inspect_pickle(pickle_file):
    try:
        with open(pickle_file, 'rb') as file:
            data = pickle.load(file)
            print("Type of data:", type(data))
            print("Data details:", data)
            if isinstance(data, dict):
                print("Dictionary keys:", list(data.keys()))
            elif isinstance(data, (list, tuple)):
                print("List/Tuple length:", len(data))
                print("First few elements:", data[:5])
            elif hasattr(data, '__dict__'):
                print("Object attributes:", vars(data))
    except Exception as e:
        print("Error reading pickle file:", str(e))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python inspect_pickle.py <path_to_pickle>")
        sys.exit(1)
    inspect_pickle(sys.argv[1])