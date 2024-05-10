import Submodule from "./submodule";
import { Freebox } from "./freebox";
import * as IPort from "../@types/port";
import request from "../utils/fetch";
import { Response, VoidResponse } from "../@types";

type TPort = IPort.default;

class PortForwarding extends Submodule {
  constructor(freebox: Freebox) {
    super(freebox);
  }

  /**
   * Retrieves the status of a port or all ports.
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#getting-the-list-of-port-forwarding
   * @param id - The ID of the port to retrieve the status for. If not provided, retrieves the status of all ports.
   * @returns {Promise<Response<T>>}
   */
  async status<T = TPort[]>(id?: number): Promise<Response<T>> {
    return await request<T>(id == undefined ? `${this.baseUrl}/fw/redir/` : `${this.baseUrl}/fw/redir/${id}`, this.token);
  }

  /**
   * Updating a port forwarding
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#updating-a-port-forwarding
   * @param id The id of the port to update
   * @param data The data to update
   * @returns {Promise<Response<T>>}
   */
  async update(id: number, data: Partial<TPort>): Promise<Response<TPort>> {
    return await request<TPort, typeof data>(`${this.baseUrl}/fw/redir/${id}`, this.token, {
      body: data,
    }, "PUT");
  }

  /**
   * Add a port forwarding
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#add-a-port-forwarding
   * @param data Add a port forwarding
   * @returns {Promise<Response<T>>}
   */
  async add(data: Required<TPort>): Promise<Response<TPort>> {
    return await request<TPort, TPort>(`${this.baseUrl}/fw/redir/`, this.token, {
      body: data,
    }, "POST");
  }

  /**
   * Delete a port forwarding
   * @link https://mafreebox.freebox.fr/doc/index.html?v=b828168f17942dd3e241fff4f01ccdd14bcc89aa#delete-a-port-forwarding
   * @param id The id of the port to delete
   * @returns {Promise<VoidResponse>}
   */
  async delete(id: number): Promise<VoidResponse> {
    return await request<VoidResponse>(`${this.baseUrl}/fw/redir/${id}`, this.token, {}, "DELETE");
  }
}

export { PortForwarding as Port };
