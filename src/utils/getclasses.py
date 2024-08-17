import inspect
import logging
import importlib
from typing import List, Type

def return_classes(modulename: str) -> List[Type]:
    """
    Import a module dynamically and return a list of classes defined in that module.

    :param modulename: The name of the module to import.
    :return: A list of classes defined in the module.
    """
    class_list = []
    try:
        temp_module = importlib.import_module(modulename)
    except ModuleNotFoundError:
        logging.error(f"[ERR]: Module '{modulename}' not found. Please check the module name.")
        return class_list
    except ImportError as e:
        logging.error(f"[ERR]: Failed to import module '{modulename}': {e}")
        return class_list

    for name, obj in inspect.getmembers(temp_module):
        if inspect.isclass(obj):
            class_list.append(obj)

    return class_list

